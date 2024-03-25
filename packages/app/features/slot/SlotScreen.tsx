import GamePageHeader from 'app/components/GamePageHeader'
import BannerCarousel from 'app/components/banner/BannerCarousel'
import { GetCommissionList } from 'app/components/game/GameUtilityAction'
import ProviderList from 'app/components/game/ProviderList'
import useGameCategoryTag from 'app/hooks/appState/game/useGameCategoryTag'
import useScrollToTop from 'app/hooks/useScrollToTop'
import useLocalization from 'app/provider/localization'
import { ScrollView, View } from 'dripsy'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Platform } from 'react-native'
import { useBannerQuery } from 'services/contentApi'
import { useGameListMultipleQuery } from 'services/gameApi'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { GAME_TYPE_CODE, ProviderImageCategory } from 'utils/constant'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import SlotSingleProviderListing from './SlotSingleProviderListing'

type Params = {
  provider?: string
}

const { useParam } = createParam<Params>()

const GameCategory = [GAME_TYPE_CODE.SLOTS]

function SlotScreen() {
  const { t } = useLocalization()
  const { push } = useRouter()
  const commissionList = GetCommissionList()
  const [provider, setProvider] = useParam('provider', {
    initial: undefined,
    parse: (templateFromUrl) => {
      return templateFromUrl && templateFromUrl[0]
        ? templateFromUrl[0]
        : undefined
    },
  })

  const scrollRef = useRef(null)
  const { ScrollToTopButton, setScrollY } = useScrollToTop({
    innerRef: scrollRef,
    liftButton: true,
  })

  const { data: banner } = useBannerQuery()
  const bannerList = banner?.filter((el) => el.banner_display_page === 'slots')

  const { data: games, isUninitialized } = useGameListMultipleQuery({
    game_category: GameCategory,
  })
  const { gameCategoryTagTranslation } = useGameCategoryTag(GameCategory)

  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const providers = useMemo(() => {
    if (games)
      return uniqBy(
        games.map(({ gtc, gpc }) => ({ gtc, gpc })),
        'gpc'
      )
    else return []
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

  const handleSelectProvider = useCallback((gpc: string) => {
    setProvider(gpc)
  }, [])

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
    <>
      <ScrollView
        ref={scrollRef}
        onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <View sx={{ gap: '$3', my: '$3', paddingBottom: 0 }}>
          <GamePageHeader icon="sl" title={t('game.category.slots')} />
          <View sx={{ width: '100%', aspectRatio: 1280 / 333 }}>
            <BannerCarousel data={bannerList} bannerType="slot" />
          </View>
          <RecentlyPlayedSection
            gameTypes={[GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING]}
          />
          <ProviderList
            data={providers}
            onNavigateProvider={handleSelectProvider}
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
      </ScrollView>
      {ScrollToTopButton}
    </>
  )
}

export default SlotScreen
