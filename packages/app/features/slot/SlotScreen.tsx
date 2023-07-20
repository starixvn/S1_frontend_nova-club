import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import ProviderList from 'app/components/game/ProviderList'
import {
  useGameFilter,
  withGameFilterProvider,
} from 'app/provider/gameFilter/GameFilterProvider'
import useLocalization from 'app/provider/localization'
import {
  GAME_TYPE_CODE,
  ProviderImageCategory,
  SlotType,
} from 'app/utils/constant'
import { ActivityIndicator, View } from 'dripsy'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { InteractionManager, Platform } from 'react-native'
import { Game } from 'services/gameApi.type'
import { createParam } from 'solito'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import SlotSingleProviderListing from './SlotSingleProviderListing'
import { useGameListMultipleQuery } from 'services/gameApi'
import groupBy from 'lodash/groupBy'

type Params = {
  provider?: string
}

const { useParam } = createParam<Params>()

function SlotScreen() {
  const { t } = useLocalization()
  const { push } = useRouter()

  const [isDelayed, setDelayed] = useState(false)
  useEffect(() => {
    setTimeout(() => setDelayed(true), 3000)
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
      game_category: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
    },
    {
      skip: !isDelayed,
    }
  )

  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  const gameGroup: Game[][] = useMemo(() => {
    return Object.values(gamesByProviders).filter((v) => v.length > 0)
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

  function onViewMore(gpc: string) {
    if (Platform.OS === 'web') push(`/slots/${gpc}`)
    else
      push({
        pathname: `/slotsByProvider?provider=${gpc.toLowerCase()}`,
      })
  }

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
      />
    )
  }

  return (
    <FlashList
      ref={flashListRef}
      estimatedItemSize={273}
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
            />
          )
        else return null
      }}
      ListHeaderComponent={
        <View sx={{ gap: '$3', my: '$3' }}>
          <GamePageHeader icon="sl" title="SLOTS" />
          <View sx={{ width: '100%', aspectRatio: 768 / 200 }}>
            <SolitoImage
              fill
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/slot/dailywins.jpg`}
              alt="dailywins"
            />
          </View>
          <RecentlyPlayedSection
            gameTypes={[GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING]}
          />
          <GameListSectionAsyncByTag
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
          />
          {isUninitialized ? (
            <ActivityIndicator color="$tertiary" sx={{ my: '$3' }} />
          ) : (
            <ProviderList
              data={providers}
              onNavigateProvider={onNavigate}
              imageCategory={ProviderImageCategory.Slot}
            />
          )}
        </View>
      }
    />
  )
}

export default SlotScreen
