import { ScrollView } from 'dripsy'
import { default as React, useEffect } from 'react'
import { useLazyPlayerProfileQuery } from 'services/playerApi'
import AnnoucementMarquee from './Section/AnnouncementMarquee'
import BannerSection from './Section/BannerSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import RecentOpenGames from './Section/RecentOpenGames'

const HomeScreen = () => {
  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1, paddingBottom: '$8' }}
      showsVerticalScrollIndicator={false}
    >
      <BannerSection />
      <AnnoucementMarquee />
      <GridSection />
      <RecentOpenGames />
      <HotGamesSection />
    </ScrollView>
  )
}

export default HomeScreen
