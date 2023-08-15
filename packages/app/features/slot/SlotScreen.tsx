import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import ProviderList from 'app/components/game/ProviderList'
import useGameCategoryTag from 'app/hooks/appState/game/useGameCategoryTag'
import useLocalization from 'app/provider/localization'
import {
  GAME_TYPE_CODE,
  ProviderImageCategory,
  SlotType,
} from 'app/utils/constant'
import { ActivityIndicator, View } from 'dripsy'
import groupBy from 'lodash/groupBy'
import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Platform } from 'react-native'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { createParam } from 'solito'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import SlotSingleProviderListing from './SlotSingleProviderListing'

type Params = {
  provider?: string
}

const { useParam } = createParam<Params>()

const GameCategory = [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING]

function SlotScreen() {
  const { t } = useLocalization()
  const { push } = useRouter()
  const [gameGroup, setGameGroup] = useState<Game[][]>()

  const [isDelayed, setDelayed] = useState(false)
  useEffect(() => {
    setTimeout(() => setDelayed(true), 1000)
  })

  const [provider, setProvider] = useParam('provider', {
    initial: undefined,
    parse: (templateFromUrl) => {
      return templateFromUrl && templateFromUrl[0]
        ? templateFromUrl[0]
        : undefined
    },
  })

  const { data: games, isUninitialized } = useGameListMultipleQuery(
    {
      game_category: GameCategory,
    },
    {
      skip: !isDelayed,
    }
  )
  const { gameCategoryTagTranslation } = useGameCategoryTag(GameCategory)

  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  useEffect(() => {
    const gamesGroup = Object.values(gamesByProviders).filter(
      (v) => v.length > 0
    )

    if (gamesGroup.length > 0) {
      startTransition(() => {
        setGameGroup(gamesGroup)
      })
    }
  }, [gamesByProviders])

  const flashListRef = useRef<FlashList<Game[]>>(null)

  function onNavigate(index: number, gpc: string) {
    if (Platform.OS === 'web') {
      document
        .getElementById(`gameSection${gpc}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      flashListRef.current?.scrollToIndex({
        animated: true,
        index,
      })
    }
  }

  const onViewMore = useCallback((gpc: string) => {
    if (Platform.OS === 'web') push(`/slots/${gpc}`)
    else
      push({
        pathname: `/slotsByProvider?provider=${gpc.toLowerCase()}`,
      })
  }, [])

  // if (!isDelayed || isUninitialized)
  //   return <ActivityIndicator color="$tertiary" sx={{ my: '$3' }} />

  if (provider && Platform.OS === 'web') {
    if (!gamesByProviders) return <ActivityIndicator />

    return (
      <SlotSingleProviderListing
        games={gamesByProviders[provider.toUpperCase()]}
        provider={provider}
        onBack={() => {
          setProvider(undefined)
        }}
        gameCategoryTagTranslation={gameCategoryTagTranslation}
      />
    )
  }

  return (
    <FlashList
      ref={flashListRef}
      estimatedItemSize={302}
      data={gameGroup}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      renderItem={({ item }) => {
        if (item && item[0])
          return (
            <GameSectionByProviderItem
              gpc={item[0].gpc}
              games={item}
              onViewMore={onViewMore}
              gameCategoryTagTranslation={gameCategoryTagTranslation}
            />
          )
        else return null
      }}
      ListHeaderComponent={
        <View sx={{ gap: '$3', my: '$3' }}>
          <GamePageHeader icon="sl" title={t('game.category.slots')} />
          <View sx={{ width: '100%', aspectRatio: 768 / 200 }}>
            <SolitoImage
              fill
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/slot/dailywins_slot.jpg`}
              alt="dailywins"
            />
          </View>
          <RecentlyPlayedSection
            gameTypes={[GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING]}
          />
          {/* <GameListSectionAsyncByTag
            tag={SlotType.NEW}
            title={t('game.new').toUpperCase()}
            icon="star"
            delay={100}
          />
          <GameListSectionAsyncByTag
            tag={SlotType.JACKPOT}
            title={t('game.jackpot').toUpperCase()}
            icon="jackpot"
            delay={500}
          />
          <GameListSectionAsyncByTag
            tag={SlotType.MEGAWAY}
            title={'MEGAWAY'}
            icon="megaway"
            delay={1000}
          /> */}
          <ProviderList
            data={providers}
            onNavigateProvider={onNavigate}
            imageCategory={ProviderImageCategory.Slot}
          />
        </View>
      }
    />
  )
}

export default SlotScreen
