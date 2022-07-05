import { ScrollView } from 'dripsy'
import { default as React, useEffect } from 'react'
import { useLazyPlayerProfileQuery } from 'services/playerApi'
import AnnoucementMarquee from './Section/AnnouncementMarquee'
import CasinoSection from './Section/CasinoSection'
import GamesSection from './Section/GamesSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import LotterySection from './Section/LotterySection'
import BannerSection from './Section/BannerSection'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'

const HomeScreen = () => {
  const [playerProfile] = useLazyPlayerProfileQuery()

  useEffect(() => {
    onGetPlayer()
    // setSelected(new Date())
  }, [])

  const onGetPlayer = async () => {
    try {
      // const { data } = await playerProfile().unwrap()
      // if (data) {
      // dispatch(PlayerActions.setUser(data))
      // }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <BannerSection />
      <AnnoucementMarquee />
      <GridSection />
      <CasinoSection />
      <LotterySection />
      <GamesSection />
      {/* <LeaderboardSection /> */}
      <HotGamesSection />
    </ScrollView>
  )
}

export default withContextualNav(HomeScreen, ContextualModuleKey.Home)
