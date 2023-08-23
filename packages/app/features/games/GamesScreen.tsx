import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import IconButtonGradientGroup from 'app/components/IconButtonGradientGroup'
import IconButtonGradientToggle from 'app/components/IconButtonGradientToggle'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import ProviderList from 'app/components/game/ProviderList'
import {
  ALL,
  GAME_TYPE_CODE,
  GDC_GAME_CATEGORY,
  HEADER_HEIGHT,
  ProviderImageCategory,
} from 'app/utils/constant'
import { ActivityIndicator, View, useResponsiveValue } from 'dripsy'
import groupBy from 'lodash/groupBy'
import React, {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Platform } from 'react-native'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import TopGameSection from '../home/TopGameSection'
import GamesScreenSingleProvider from './GamesSingleProviderListing'
import { MobileGamesFilter, SUB_ROUTES } from './subroutes'
import useLocalization from 'app/provider/localization'
import useGameCategoryTag from 'app/hooks/appState/game/useGameCategoryTag'
import { uniqBy } from 'lodash'

type Params = {
  type?: string
}

const { useParam } = createParam<Params>()

const GameCategory = [
  GAME_TYPE_CODE.GAMES,
  GAME_TYPE_CODE.FISHING,
  GAME_TYPE_CODE.LOTTERY,
]

const GamesScreen = () => {
  const { t } = useLocalization()
  const scrollingRef = useRef<View>()
  const { data: games } = useGameListMultipleQuery({
    game_category: GameCategory,
    gdc_game_category: [GDC_GAME_CATEGORY.CARDGAME],
  })
  const { gameCategoryTagTranslation } = useGameCategoryTag(GameCategory)

  const [filteredGames, setFilteredGames] = useState<Game[]>()
  const { push } = useRouter()
  const mobileGamesFilterResponsiveSize = useResponsiveValue([
    60, 60, 70, 70, 70,
  ])

  const [params, setParams] = useParam('type', {
    parse: (templateFromUrl) => {
      return templateFromUrl
    },
    initial: undefined,
  })

  const [type = ALL, provider] = params || []
  const route = type ? SUB_ROUTES[type] : undefined
  // if (!route && defaultType) setType(defaultType)

  useEffect(() => {
    if (route && route.filter && games) {
      const filtered = route.filter(games)
      startTransition(() => setFilteredGames(filtered))
    } else startTransition(() => setFilteredGames(games))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, games])

  useEffect(() => {
    if (type !== ALL) {
      if (Platform.OS === 'web') {
        document
          .getElementById(`scrollingPoint`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else
        scrollingRef.current.measure((width, height, px, py, fx, fy) => {
          flashListRef.current?.scrollToOffset({
            animated: true,
            offset: fy - HEADER_HEIGHT - 12,
          })
        })
    }
  }, [type])

  const flashListRef = useRef<FlashList<Game[]>>(null)

  const gamesByProviders = useMemo(() => {
    return groupBy(filteredGames, 'gpc')
  }, [filteredGames])

  const providers = useMemo(() => {
    if (games)
      return uniqBy(
        games.map(({ gtc, gpc }) => ({ gtc, gpc })),
        'gpc'
      )
    else return []
  }, [games])

  const gameGroup: Game[][] = useMemo(() => {
    return Object.values(gamesByProviders).filter((v) => v.length > 0)
  }, [gamesByProviders])

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

  function onFilterClicked(r, i: number) {
    if (r.filter) {
      setParams([r.route, provider])
    } else if (r.route) {
      push(r.route)
    }
  }

  function onViewMore(gpc: string, tag: string = 'All') {
    if (Platform.OS === 'web') push(`/games/${type}/${gpc}/${tag}`)
    else {
      push('/gamesByProvider?provider=' + gpc.toLowerCase() + `&tag=${tag}`)
    }
    // setParams([type, gpc.toLowerCase()])
  }

  function onProviderBack() {
    setParams([type])
  }

  // console.log('params', type, provider)
  if (provider && Platform.OS === 'web') {
    if (!gamesByProviders || !filteredGames) return <ActivityIndicator />
    return (
      <GamesScreenSingleProvider
        tag={params?.[2] ?? 'ALL'}
        games={gamesByProviders[provider.toUpperCase()] ?? []}
        provider={provider}
        type={type}
        onFilterClicked={onFilterClicked}
        onBack={onProviderBack}
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
              gtc={item[0].gtc}
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
          <GamePageHeader icon="games1" title={t('game.category.games')} />
          <IconButtonGradientGroup
            sx={{
              flex: 1,
              minWidth: ['100%', 450],
              alignSelf: 'center',
            }}
          >
            {MobileGamesFilter.map((r, i) => {
              return (
                <IconButtonGradientToggle
                  sx={{ flex: 1 }}
                  key={r.label}
                  active={
                    type !== ALL ? r.route.includes(type) : r.route === '/games'
                  }
                  label={r.label}
                  size={mobileGamesFilterResponsiveSize}
                  icon={r.icon ?? 'notice'}
                  labelProps={{ style: { fontSize: 11 }, numberOfLines: 2 }}
                  onPress={() => onFilterClicked(r, i)}
                />
              )
            })}
          </IconButtonGradientGroup>
          <RecentlyPlayedSection
            gameTypes={[
              GAME_TYPE_CODE.GAMES,
              GAME_TYPE_CODE.FISHING,
              GAME_TYPE_CODE.LOTTERY,
            ]}
            gameCategories={[GDC_GAME_CATEGORY.CARDGAME]}
          />
          <TopGameSection />
          <View ref={scrollingRef} nativeID="scrollingPoint" />
          <ProviderList
            data={providers}
            onNavigateProvider={onNavigate}
            imageCategory={ProviderImageCategory.Games}
          />
        </View>
      }
    />
  )
}

export default GamesScreen
