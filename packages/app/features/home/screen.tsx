import useOrientation from 'app/hooks/useOrientation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView } from 'dripsy'
import { Orientation } from 'expo-screen-orientation'
import { default as React } from 'react'
import AnnouncementMarquee from './Section/AnnouncementMarquee'
import BannerSection from './Section/BannerSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import Jackpot from './Section/Jackpot'
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
      <GridSection />
      <RecentOpenGames />
      <HotGamesSection />
      <Jackpot />
    </ScrollView>
  )
}

export default HomeScreen
