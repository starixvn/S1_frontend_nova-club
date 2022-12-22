import useOrientation from 'app/hooks/useOrientation'
import { ScrollView } from 'dripsy'
import { default as React } from 'react'
import LuckyDrawTrigger from './LuckyDrawTrigger'
import AnnouncementMarquee from './Section/AnnouncementMarquee'
import BannerSection from './Section/BannerSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import Jackpot from './Section/Jackpot'
import MatchesSection from './Section/MatchesSection'
import Prediction from './Section/Prediction'
import RecentOpenGames from './Section/RecentOpenGames'
const HomeScreen = () => {
  const { isLandscape } = useOrientation()

  return (
    <ScrollView
      bounces={false}
      sx={{
        bg: '$background',
        flex: 1,
        'overflow-y': 'hidden', // This Fix web scrolling sometimes stuck and require 2nd touch to scroll
      }}
      showsVerticalScrollIndicator={false}
    >
      {!isLandscape && <BannerSection />}
      <AnnouncementMarquee />
      <MatchesSection />
      <GridSection />
      <RecentOpenGames />
      <HotGamesSection />
      <Jackpot />
      <LuckyDrawTrigger />
      <Prediction />
    </ScrollView>
  )
}

export default HomeScreen
