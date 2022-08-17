import { ScrollView, useDripsyTheme } from 'dripsy'
import { default as React, useEffect } from 'react'
import { useLazyPlayerProfileQuery } from 'services/playerApi'
import AnnoucementMarquee from './Section/AnnouncementMarquee'
import BannerSection from './Section/BannerSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import Jackpot from './Section/Jackpot'
import RecentOpenGames from './Section/RecentOpenGames'

const HomeScreen = () => {
  const { theme } = useDripsyTheme()
  return (
    <ScrollView
      bounces={false}
      sx={{ bg: '$background', flex: 1 }}
      contentContainerStyle={{
        paddingBottom: theme.space['$8'],
      }}
      showsVerticalScrollIndicator={false}
    >
      <BannerSection />
      <AnnoucementMarquee />
      <GridSection />
      <RecentOpenGames />
      <HotGamesSection />
      <Jackpot />
    </ScrollView>
  )
}

export default HomeScreen
