import useOrientation from 'app/hooks/useOrientation'
import useShield from 'app/hooks/useShield'
import { useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { TempSettingActions } from 'app/store/tempSetting.slice'
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
  const syncShieldActionType = useAppSelector(
    (s) => s.tempSetting.syncShieldActionType
  )
  const syncShieldStatus = useAppSelector(
    (state) => state.tempSetting.syncShieldStatus
  )

  const { syncShield } = useShield()

  const checkSyncShield = async () => {
    try {
      const _ = await syncShield(
        syncShieldActionType === Shield_Action.NONE
          ? Shield_Action.LOGIN
          : syncShieldActionType
      )

      // Dont care abou sync shield success or not as long as it ad triggered
      dispatch(TempSettingActions.setSyncShieldStatus(true))
    } catch (error) {
      console.error(error)
    }
  }

  function handleCheckShield() {
    if (syncShieldStatus) {
      return
    }

    checkSyncShield()
  }

  useEffect(() => {
    handleCheckShield()
  }, [])

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
      {/* <Prediction /> */}
    </ScrollView>
  )
}

export default HomeScreen
