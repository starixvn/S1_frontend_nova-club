import GamePageHeader from 'app/components/GamePageHeader'
import GameListByProvider from 'app/components/game/GameListByProvider'
import GameFilterProvider from 'app/provider/gameFilter/GameFilterProvider'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import { ScrollView } from 'dripsy'
import React from 'react'
import BannerSection from '../home/BannerSection'
import IconButtonGradientGroup from 'app/components/IconButtonGradientGroup'
import IconButtonGradientToggle from 'app/components/IconButtonGradientToggle'
import { BOTTOM_TAB_BAR_HEIGHT } from 'app/components/navigation/BottomTabBar'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import TopGameSection from '../home/TopGameSection'

const GAMES_FILTER = [
  {
    label: 'All',
    icon: 'all',
  },
  {
    label: 'Card Game',
    icon: 'card-game',
  },
  {
    label: 'Local Game',
    icon: 'games',
  },
  {
    label: 'Fishing',
    icon: 'fishing',
  },
  {
    label: 'Keno/Lottery',
    icon: 'lotto',
  },
]

export default function GamesScreen() {
  return (
    <ScrollView>
      <GamePageHeader icon="games1" title="GAMES" />
      {/* Change to Games Own Banner Section */}
      <BannerSection />
      <GameFilterProvider
        gameCategories={[GDC_GAME_CATEGORY.CARDGAME]}
        gameTypes={[
          GAME_TYPE_CODE.GAMES,
          GAME_TYPE_CODE.FISHING,
          GAME_TYPE_CODE.LOTTERY,
        ]}
      >
        <IconButtonGradientGroup
          sx={{ my: ['$1', '$3'], maxWidth: 550, alignSelf: 'center' }}
        >
          {GAMES_FILTER.map((r, i) => {
            return (
              <IconButtonGradientToggle
                sx={{ flex: 1 }}
                key={r.label}
                active={i === 0}
                label={r.label}
                size={BOTTOM_TAB_BAR_HEIGHT * 1.2}
                icon={r.icon ?? 'notice'}
                labelProps={{ style: { fontSize: 13 } }}
                onPress={() => {}}
              />
            )
          })}
        </IconButtonGradientGroup>
        <RecentlyPlayedSection />
        <TopGameSection />
        <GameListByProvider />
      </GameFilterProvider>
    </ScrollView>
  )
}
