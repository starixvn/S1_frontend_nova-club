import AnnouncementSection from 'app/features/home/Announcement/AnnouncementSection'
import BannerSection from 'app/features/home/BannerSection'
import HireBanner from 'app/features/home/HireBanner'
import LuckyDrawTrigger from 'app/features/home/LuckyDrawTrigger'
import TopGameSection from 'app/features/home/TopGameSection'
import useShield from 'app/hooks/useShield'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { ActivityIndicator, Container, Row, View } from 'dripsy'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { Shield_Action } from 'services/authApi.type'

import dynamic from 'next/dynamic'
import withLazyLoad from 'app/hoc/withLadyLoad'
import LazyIndicator from 'app/components/LazyIndicator'
import HireBannerDesktop from 'app/features/home/HireBannerDesktop'

const DeferredSection = dynamic(() => import('./DeferredSection'), {
  loading: () => <LazyIndicator />,
  ssr: false,
})

const LazyDeferredSection = withLazyLoad(DeferredSection)

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const username = useAppSelector((s) => s.auth.info?.playerName)
  const syncShieldActionType = useAppSelector(
    (s) => s.tempSetting.syncShieldActionType
  )
  const { openModal, closeModal } = useModal()
  const luckyDrawBalance = useAppSelector((s) => s.setting.luckyDrawBalance)

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
    if (luckyDrawBalance) {
      closeModal('LuckyDrawModal')
      setTimeout(() => {
        openModal('LuckyDrawModal')
      }, 500)
    }
  }, [username])
  return (
    <View sx={{ pb: '$6' }}>
      <LuckyDrawTrigger />
      <BannerSection />
      <Container sx={{ gap: '$sectionBottomSpace' }}>
        <View
          sx={{
            gap: '$sectionBottomSpace',
            pt: '$sectionBottomSpace',
            px: '$pagePadding',
          }}
        >
          <AnnouncementSection />
          <Row sx={{ gap: '$pagePadding' }}>
            <View sx={{ flex: 1 }}>
              <HireBanner />
            </View>
            <View sx={{ flex: 1 }}>
              <HireBannerDesktop />
            </View>
          </Row>
        </View>
        <TopGameSection />
        <LazyDeferredSection />
      </Container>
    </View>
  )
}
