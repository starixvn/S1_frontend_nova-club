import Select from 'app/components/form/Select'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import withAuth from 'app/hooks/withAuth'
import { useAppSelector } from 'app/provider/redux/store'
import { useLazyPlayerProfileQuery } from 'app/services/playerApi'
import { logOut } from 'app/utils/authUtil'
import { Pressable, ScrollView, Text, View } from 'dripsy'
import * as Updates from 'expo-updates'
import { default as React, useEffect, useRef, useState } from 'react'
import { Button, Platform } from 'react-native'
import { useRouter } from 'solito/router'
import BannerSection from './Section/BannerSection'
import CasinoSection from './Section/CasinoSection'
import GamesSection from './Section/GamesSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import LeaderboardSection from './Section/LeaderboardSection'
import LotterySection from './Section/LotterySection'
import AnnoucementMarquee from './Section/AnnouncementMarquee'
// import { PlayerActions } from 'app/store/playerReducer'
import { useDispatch } from 'react-redux'

const HomeScreen = () => {
  const [selected, setSelected] = useState(null)
  const [updateStatus, setUpdateStatus] = useState('--')
  const [event, setEvent] = useState('-')
  const dispatch = useDispatch()

  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const { push } = useRouter()

  const [playerProfile] = useLazyPlayerProfileQuery()

  useEffect(() => {
    async function checkUpdate() {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable && update.manifest) {
        setUpdateStatus(JSON.stringify(update.manifest.id))
      }

      Updates.addListener((e) => {
        setEvent(e.type)
      })
    }

    if (Platform.OS !== 'web') {
      checkUpdate()
    }
    onGetPlayer()
  }, [])

  const handleOtp = () => {
    console.log('handle otp api')
  }

  const onLogout = async () => {
    await logOut()
    push('/auth/login')
  }

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
      <LeaderboardSection />
      <HotGamesSection />
    </ScrollView>
  )
}

export default withAuth(HomeScreen)
