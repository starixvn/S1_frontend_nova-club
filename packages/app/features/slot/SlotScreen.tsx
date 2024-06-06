import GamePageHeader from 'app/components/GamePageHeader'
import ScrollToTopWrapper from 'app/components/ScrollToTopWrapper'
import BannerCarousel from 'app/components/banner/BannerCarousel'
import ProviderList from 'app/components/game/ProviderList'
import useGameCategoryTag from 'app/hooks/appState/game/useGameCategoryTag'
import useFocusedSelector from 'app/hooks/useFocusedSelector'
import FocusedLocalizationProvider from 'app/provider/localization/FocusedLocalizationProvider'
import { View } from 'dripsy'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import {
  default as React,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { Platform } from 'react-native'
import {
  selectBannerByPage,
  useBannerQuery,
  useCommissionTableQuery,
} from 'services/contentApi'
import { BannerPage } from 'services/contentApi.type'
import { useGameListMultipleQuery } from 'services/gameApi'
import { createParam } from 'solito'
import {
  Currency,
  GAME_TYPE_CODE,
  LANGUAGE_NAMESPACE,
  ProviderImageCategory,
} from 'utils/constant'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import SlotSingleProviderListing from './SlotSingleProviderListing'

type Params = {
  provider?: string
}

const { useParam } = createParam<Params>()

const GameCategory = [GAME_TYPE_CODE.SLOTS]

function SlotScreen() {
  const scrollRef = useRef()
  const [provider, setProvider] = useParam('provider', {
    initial: undefined,
    parse: (templateFromUrl) => {
      return templateFromUrl && templateFromUrl[0]
        ? templateFromUrl[0]
        : undefined
    },
  })

  const currency = useFocusedSelector((s) => s.setting.currency)

  const { data: commissionList } = useCommissionTableQuery({ currency })

  const { banners } = useBannerQuery(currency, {
    selectFromResult: (s) => {
      return {
        ...s,
        banners: selectBannerByPage(s.data, BannerPage.Slot),
      }
    },
  })

  const { data: games } = useGameListMultipleQuery({
    currency,
    game_category: GameCategory,
  })
  const gameCategoryTagTranslation = useGameCategoryTag(GameCategory)

  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const sortProviders = useCallback(
    (list) => {
      if (currency === Currency.THB) {
        const position = list.findIndex((item) => item.gpc === 'PGSF')

        if (position !== -1) {
          const [item] = list.splice(position, 1)
          if (item) list.unshift(item)

          return list
        }
      } else return list
    },
    [currency]
  )

  const providers = useMemo(() => {
    if (games) {
      const list = uniqBy(
        games.map(({ gtc, gpc }) => ({ gtc, gpc })),
        'gpc'
      )
      const sortedList = sortProviders(list)

      return sortedList
    } else return []
  }, [games])

  useEffect(() => {
    provider && onNavigate(provider)
  }, [provider])

  // useEffect(() => {
  //   const gamesGroup = Object.values(gamesByProviders).filter(
  //     (v) => v.length > 0
  //   )

  //   if (gamesGroup.length > 0) {
  //     startTransition(() => {
  //       setGameGroup(gamesGroup)
  //     })
  //   }
  // }, [gamesByProviders])

  function onNavigate(provider: string) {
    if (Platform.OS === 'web') {
      document
        .getElementById(`gameSection${provider}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      scrollRef.current?.scrollTo({
        y: 600,
        animated: true,
      })
    }
  }

  // if (!isDelayed || isUninitialized)
  //   return <ActivityIndicator color="$tertiary" sx={{ my: '$3' }} />

  // if (provider && Platform.OS === 'web') {
  //   if (!gamesByProviders) return <ActivityIndicator />

  //   return (
  //     <SlotSingleProviderListing
  //       gtc={GAME_TYPE_CODE.SLOTS}
  //       commissionList={commissionList}
  //       games={gamesByProviders[provider.toUpperCase()]}
  //       provider={provider}
  //       onBack={() => {
  //         setProvider(undefined)
  //       }}
  //       gameCategoryTagTranslation={gameCategoryTagTranslation}
  //     />
  //   )
  // }

  return (
    <FocusedLocalizationProvider namespace={LANGUAGE_NAMESPACE.MEMBER}>
      <ScrollToTopWrapper ref={scrollRef}>
        <View sx={{ gap: '$3', my: '$3', paddingBottom: 0 }}>
          <GamePageHeader icon="sl" title={'game.category.slots'} />
          <View sx={{ width: '100%', aspectRatio: 1280 / 333 }}>
            <BannerCarousel data={banners} bannerType="slot" />
          </View>
          <RecentlyPlayedSection
            gameTypes={[GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING]}
          />
          <ProviderList
            data={providers}
            onNavigateProvider={setProvider}
            imageCategory={ProviderImageCategory.Slot}
          />

          <SlotSingleProviderListing
            gtc={GAME_TYPE_CODE.SLOTS}
            commissionList={commissionList}
            games={provider ? gamesByProviders[provider.toUpperCase()] : games}
            provider={provider}
            gameCategoryTagTranslation={gameCategoryTagTranslation}
          />
        </View>
      </ScrollToTopWrapper>
    </FocusedLocalizationProvider>
  )
}

export default SlotScreen
