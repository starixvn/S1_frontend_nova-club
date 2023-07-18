import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import Footer from 'app/components/navigation/footer'
import useLocalization from 'app/provider/localization'
import { SlotType } from 'app/utils/constant'
import { ScrollView, View } from 'dripsy'
import AnnouncementSection from './Announcement/AnnouncementSection'
import BannerSection from './BannerSection'
import GameGridSection from './GameGridSection'
import HireBanner from './HireBanner'
import LeaderboardSection from './LeaderboardSection'
import MatchSection from './Match/MatchSection'
import ReferralSection from './Referral/ReferralSection'
import TopGameSection from './TopGameSection'
import useShield from 'app/hooks/useShield'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { useEffect } from 'react'
import { Shield_Action } from 'services/authApi.type'
import LuckyDrawTrigger from './LuckyDrawTrigger'
import { useModal } from 'react-native-modalfy'

export default function HomeScreen() {
  const { t } = useLocalization()
  const dispatch = useAppDispatch()
  const username = useAppSelector((s) => s.auth.info?.playerName)
  const syncShieldActionType = useAppSelector(
    (s) => s.tempSetting.syncShieldActionType
  )
  const { openModal, closeModal, closeAllModals } = useModal()
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
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      sx={{ flex: 1 }}
      contentContainerSx={{ pb: '$4' }}
    >
      <BannerSection />
      <View sx={{ gap: ['$2', '$3'], pt: ['$2', '$3'], px: '$3' }}>
        <AnnouncementSection />
        <HireBanner />
      </View>
      <GameGridSection />
      {/* <RecentlyPlayedSection /> */}
      <View sx={{ gap: ['$3', '$4'] }}>
        <TopGameSection />
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
          title={'MEGAWAY'}
          icon="megaway"
        />
        <MatchSection />
        <LeaderboardSection />
        <ReferralSection />
        <LuckyDrawTrigger />
      </View>
      <Footer />
    </ScrollView>
  )
}
