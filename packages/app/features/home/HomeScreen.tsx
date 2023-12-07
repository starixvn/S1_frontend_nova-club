import useShield from 'app/hooks/useShield'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { ScrollView, View } from 'dripsy'
import { useEffect } from 'react'
import { Shield_Action } from 'services/authApi.type'
import AnnouncementSection from './Announcement/AnnouncementSection'
import BannerSection from './BannerSection'
import Deferrable from './Deferrable'
import GameGridSection from './GameGridSection'
import HireBanner from './HireBanner'
import ModalTriggers from './EventModal'

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const username = useAppSelector((s) => s.auth.info?.playerName)
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
    if (username) handleCheckShield()
  }, [username])

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      sx={{ flex: 1 }}
      contentContainerSx={{ pb: '$1' }}
    >
      <BannerSection />
      <View sx={{ gap: ['$2', '$3'], pt: ['$2', '$3'], px: '$3' }}>
        <AnnouncementSection />
        <HireBanner />
      </View>
      <GameGridSection />
      <Deferrable />
      <ModalTriggers />
    </ScrollView>
  )
}
