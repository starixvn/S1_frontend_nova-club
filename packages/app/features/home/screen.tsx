import { ITimerButtonForwardRef } from 'app/components/TimerButton'
import withAuth from 'app/hooks/withAuth'
import { logOut } from 'app/utils/authUtil'
import { ScrollView } from 'dripsy'
import * as Updates from 'expo-updates'
import { default as React, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { useLazyPlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/wallet'
import { useRouter } from 'solito/router'
import CasinoSection from './Section/CasinoSection'
import GamesSection from './Section/GamesSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import LeaderboardSection from './Section/LeaderboardSection'
import LotterySection from './Section/LotterySection'
import AnnoucementMarquee from './Section/AnnouncementMarquee'

const HomeScreen = () => {
  const [playerProfile] = useLazyPlayerProfileQuery()

  useEffect(() => {
    onGetPlayer()
    // setSelected(new Date())
  }, [])

  const onGetPlayer = async () => {
    try {
      const { data } = await playerProfile().unwrap()
      if (data) {
        // dispatch(PlayerActions.setUser(data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* <BannerSection /> */}
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

export default withAuth(HomeScreen)
