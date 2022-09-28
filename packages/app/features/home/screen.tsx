import { ScrollView } from 'dripsy'
import { default as React } from 'react'
import AnnouncementMarquee from './Section/AnnouncementMarquee'
import BannerSection from './Section/BannerSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import Jackpot from './Section/Jackpot'
import RecentOpenGames from './Section/RecentOpenGames'

const HomeScreen = () => {
  return (
    <ScrollView
      bounces={false}
      sx={{ bg: '$background', flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <BannerSection />
      <AnnouncementMarquee />
      <GridSection />
      <RecentOpenGames />
      <HotGamesSection />
      <Jackpot />
    </ScrollView>
  )
}

export default HomeScreen
