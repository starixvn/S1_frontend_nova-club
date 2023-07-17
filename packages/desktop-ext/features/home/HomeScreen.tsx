import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import AnnouncementSection from 'app/features/home/Announcement/AnnouncementSection'
import BannerSection from 'app/features/home/BannerSection'
import HireBanner from 'app/features/home/HireBanner'
import LeaderboardSection from 'app/features/home/LeaderboardSection'
import MatchSection from 'app/features/home/Match/MatchSection'
import ReferralSection from 'app/features/home/Referral/ReferralSection'
import TopGameSection from 'app/features/home/TopGameSection'
import useLocalization from 'app/provider/localization'
import { SlotType } from 'app/utils/constant'
import { Container, Row, Text, View } from 'dripsy'
import React, { useEffect } from 'react'
import MiddleBanner from './MiddleBanner'
import AppDownloadSection from '../download/AppDownloadSection'
import useShield from 'app/hooks/useShield'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { Shield_Action } from 'services/authApi.type'
import LuckyDrawTrigger from 'app/features/home/LuckyDrawTrigger'
import { useModal } from 'react-native-modalfy'

export default function HomeScreen() {
  const { t } = useLocalization()
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
  }, [username, luckyDrawBalance])
  return (
    <View sx={{ pb: '$6' }}>
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
              <HireBanner />
            </View>
          </Row>
        </View>
        <TopGameSection />
        <Row sx={{ gap: '$pagePadding' }}>
          <MiddleBanner sx={{ flex: 1, gap: '$pagePadding' }}></MiddleBanner>
          <View sx={{ flex: 1, gap: '$pagePadding' }}>
            <GameListSectionAsyncByTag
              tag={SlotType.NEW}
              title={t('game.new').toUpperCase()}
              icon="star"
            />
            <GameListSectionAsyncByTag
              tag={SlotType.JACKPOT}
              title={t('game.jackpot').toUpperCase()}
              icon="jackpot"
            />
            <GameListSectionAsyncByTag
              tag={SlotType.MEGAWAY}
              title={t('game.megaway').toUpperCase()}
              icon="megaway"
            />
          </View>
        </Row>
        <Row sx={{ alignItems: 'stretch', gap: '$pagePadding' }}>
          <View
            sx={{
              flex: 1,
              gap: '$pagePadding',
              justifyContent: 'space-evenly',
            }}
          >
            <MatchSection />
            <ReferralSection />
          </View>
          <LeaderboardSection sx={{ flex: 1 }} />
        </Row>
        <AppDownloadSection />
        <LuckyDrawTrigger />
      </Container>
    </View>
  )
}
