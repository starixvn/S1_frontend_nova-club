import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import IconButtonGradientGroup from 'app/components/IconButtonGradientGroup'
import IconButtonGradientToggle from 'app/components/IconButtonGradientToggle'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import ProviderList from 'app/components/game/ProviderList'
import {
  useGameFilter,
  withGameFilterProvider,
} from 'app/provider/gameFilter/GameFilterProvider'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import React, { RefObject, useMemo, useRef, useTransition } from 'react'
import { Game } from 'services/gameApi.type'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import { Platform } from 'react-native'
import TopGameSection from '../home/TopGameSection'

const enum FILTER_CATEGORY {
  GDC = 'gdc',
}

const GAMES_FILTER = [
  {
    label: 'All',
    icon: 'all',
  },
  {
    label: 'Card Game',
    icon: 'card-game',
    gameType: GDC_GAME_CATEGORY.CARDGAME,
    filterCategory: FILTER_CATEGORY.GDC,
  },
  {
    label: 'Local Game',
    icon: 'games',
    gameType: GAME_TYPE_CODE.GAMES,
  },
  {
    label: 'Fishing',
    icon: 'fishing',
    gameType: GAME_TYPE_CODE.FISHING,
  },
  {
    label: 'Keno/Lottery',
    icon: 'lotto',
    gameType: GAME_TYPE_CODE.LOTTERY,
  },
  {
    label: 'Recommended',
    icon: 'jackpot',
    onPress: (scrollRef: RefObject<FlashList<Game[]>>) => {
      if (Platform.OS === 'web') {
        document
          .getElementById(`recGame`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        scrollRef.current?.scrollToEnd({ animated: true })
      }
    },
  },
]

const _GamesScreen = () => {
  const { games, gamesByProviders, filterKey, setFilteredGames } =
    useGameFilter()

  const flashListRef = useRef<FlashList<Game[]>>(null)

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

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
          return <GameSectionByProviderItem gpc={item[0].gpc} games={item} />
        else return null
      }}
      ListHeaderComponent={
        <>
          <GamePageHeader icon="games1" title="GAMES" />
          <IconButtonGradientGroup
            sx={{
              my: ['$3'],
              maxWidth: 550,
              alignSelf: 'center',
            }}
          >
            {GAMES_FILTER.map((r, i) => {
              return (
                <IconButtonGradientToggle
                  sx={{ flex: 1 }}
                  key={r.label}
                  active={r.gameType === filterKey && !r.onPress}
                  label={r.label}
                  size={60}
                  icon={r.icon ?? 'notice'}
                  labelProps={{ style: { fontSize: 11 } }}
                  onPress={
                    r.onPress
                      ? () => r.onPress(flashListRef)
                      : () => {
                          const filtered = r.gameType
                            ? games.filter((g) => {
                                if (r.filterCategory === FILTER_CATEGORY.GDC) {
                                  return g.gdc_cat === r.gameType
                                } else {
                                  return g.gtc === r.gameType
                                }
                              })
                            : games

                          setFilteredGames(filtered, r.gameType)
                        }
                  }
                />
              )
            })}
          </IconButtonGradientGroup>
          <RecentlyPlayedSection />
          <ProviderList data={providers} onNavigateProvider={onNavigate} />
        </>
      }
      ListFooterComponent={<TopGameSection nativeID="recGame" />}
    />
    // <GameSectionByProvider data={gamesByProviders} />
  )
}

const GamesScreen = withGameFilterProvider(_GamesScreen, {
  gameTypes: [
    GAME_TYPE_CODE.GAMES,
    GAME_TYPE_CODE.FISHING,
    GAME_TYPE_CODE.LOTTERY,
  ],
  gameCategories: [GDC_GAME_CATEGORY.CARDGAME],
})

export default GamesScreen
