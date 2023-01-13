import useOrientation from 'app/hooks/useOrientation'
import useShield from 'app/hooks/useShield'
import { useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { ScrollView } from 'dripsy'
import { default as React, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { Shield_Action } from 'services/authApi.type'
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
  const dispatch = useDispatch()
  const [status, setStatus] = useState(false)
  const syncShieldActionType =
    useAppSelector((s) => s.auth.syncShieldActionType) ?? ''
  // console.log('Shield: ', syncShieldActionType)
  const { syncShield } = useShield()

  const checkSyncShield = async () => {
    const { data } = await syncShield(syncShieldActionType)
    console.log('Async Success Status', data.success)
    if (data.success === true) {
      dispatch(AuthActions.setSyncShieldStatus(true))

      setStatus(true)
    } else {
      dispatch(AuthActions.setSyncShieldStatus(false))

      setStatus(false)
    }
  }
  useEffect(() => {
    checkSyncShield()
    if (syncShieldActionType === Shield_Action.REGISTER && status === false) {
      // const interval = setInterval(() => {
      checkSyncShield()
      // console.log(temp)
      // }, 5000)
      // return () => clearInterval(interval)
    } else checkSyncShield()

    // Todo Set interval aync await 5 second Refetch
    // around 5 second wait and request
    // if shield action type is  register, must wait syncshield done first, then only trigger luckydraw
    // if is login, then no need check syncshield.
  }, [status])

  return (
    <ScrollView
      bounces={false}
      sx={{
        bg: '$background',
        flex: 1,
        ...(Platform.OS === 'web' && { 'overflow-y': 'hidden' }),
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
