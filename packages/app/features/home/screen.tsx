import useOrientation from 'app/hooks/useOrientation'
import { ScrollView } from 'dripsy'
import { default as React, useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { createParam } from 'solito'
import LuckyDrawTrigger from './LuckyDrawTrigger'
import AnnouncementMarquee from './Section/AnnouncementMarquee'
import BannerSection from './Section/BannerSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import Jackpot from './Section/Jackpot'
import MatchesSection from './Section/MatchesSection'
import RecentOpenGames from './Section/RecentOpenGames'
const HomeScreen = () => {
  const { isLandscape } = useOrientation()

  return (
    <ScrollView
      bounces={false}
      sx={{ bg: '$background', flex: 1 }}
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
    </ScrollView>
  )
}

export default HomeScreen
