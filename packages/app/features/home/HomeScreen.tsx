import useShield from 'app/hooks/useShield'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { ScrollView, View } from 'dripsy'
import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { Shield_Action } from 'services/authApi.type'
import AnnouncementSection from './Announcement/AnnouncementSection'
import BannerSection from './BannerSection'
import Deferrable from './Deferrable'
import EventPopup from './EventPopup'
import GameGridSection from './GameGridSection'
import HireBanner from './HireBanner'
import LuckyDrawTrigger from './LuckyDrawTrigger'

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const username = useAppSelector((s) => s.auth.info?.playerName)
  const syncShieldActionType = useAppSelector(
    (s) => s.tempSetting.syncShieldActionType
  )
  const { openModal, closeModal, currentModal } = useModal()
  const luckyDrawBalance = useAppSelector((s) => s.setting.luckyDrawBalance)
  const retentionDrawBalance = useAppSelector(
    (s) => s.setting.retentionDrawBalance
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

  useEffect(() => {
    let openLuckyDrawModalInstance: NodeJS.Timeout

    if (luckyDrawBalance || retentionDrawBalance) {
      if (currentModal === 'LuckyDrawModal') {
        closeModal('LuckyDrawModal')
      }

      openLuckyDrawModalInstance = setTimeout(() => {
        openModal('LuckyDrawModal')
      }, 2000)
    }

    return () => {
      clearTimeout(openLuckyDrawModalInstance)
    }
  }, [luckyDrawBalance, retentionDrawBalance])

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      sx={{ flex: 1 }}
      contentContainerSx={{ pb: '$1' }}
    >
      <LuckyDrawTrigger />
      <BannerSection />
      <View sx={{ gap: ['$2', '$3'], pt: ['$2', '$3'], px: '$3' }}>
        <AnnouncementSection />
        <HireBanner />
      </View>
      <GameGridSection />
      <Deferrable />
      <EventPopup />
    </ScrollView>
  )
}
