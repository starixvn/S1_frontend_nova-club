import { ScrollView } from 'dripsy'
import React from 'react'
import CasinoSection from './Section/CasinoSection'
import GamesSection from './Section/GamesSection'
import HotGamesSection from './Section/HotGamesSection'
import LeaderboardSection from './Section/LeaderboardSection'
import LotterySection from './Section/LotterySection'

const HomeScreen = () => {
  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1, pt: 2 }}
      showsVerticalScrollIndicator={false}
    >
      <CasinoSection />
      <LotterySection />
      <GamesSection />
      <LeaderboardSection />
      <HotGamesSection />
    </ScrollView>
  )
}

export default HomeScreen
