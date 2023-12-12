import LazyIndicator from 'app/components/LazyIndicator'
import AnnouncementSection from 'app/features/home/Announcement/AnnouncementSection'
import BannerSection from 'app/features/home/BannerSection'
import HireBanner from 'app/features/home/HireBanner'
import HireBannerSecond from 'app/features/home/HireBannerSecond'
import ModalTriggers from 'app/features/home/EventModal'
import TopGameSection from 'app/features/home/TopGameSection'
import withLazyLoad from 'app/hoc/withLazyLoad'
import useShield from 'app/hooks/useShield'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { Container, Row, View } from 'dripsy'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { Shield_Action } from 'services/authApi.type'

const DeferredSection = dynamic(() => import('./DeferredSection'), {
  loading: () => <LazyIndicator />,
  ssr: false,
})

const LazyDeferredSection = withLazyLoad(DeferredSection)

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
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
    if (username && isLoggedIn) handleCheckShield()
  }, [username, isLoggedIn])

  useEffect(() => {
    //Trivial fix to handle intersection observer unable to load the lazy component when switch to agent app and switch back to member app
    const bodyElement = document.body
    bodyElement.style.minHeight = '118vh'
    return () => {
      bodyElement.style.minHeight = '100vh'
    }
  }, [])

  return (
    <View>
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
              <HireBannerSecond />
            </View>
          </Row>
        </View>
        <TopGameSection />
        <LazyDeferredSection />
      </Container>
      <ModalTriggers />
    </View>
  )
}
