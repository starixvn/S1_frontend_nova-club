import ScrollToTopWrapper from 'app/components/ScrollToTopWrapper'
import { CheckModuleExist as ConnectionCheck } from 'app/components/netInfo/CheckModuleExist'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import useShield from 'app/hooks/useShield'
import FocusedLocalizationProvider from 'app/provider/localization/FocusedLocalizationProvider'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { ScrollView, View } from 'dripsy'
import { useEffect } from 'react'
import { Shield_Action } from 'services/authApi.type'
import { LANGUAGE_NAMESPACE } from 'utils/constant'
import AnnouncementSection from './Announcement/AnnouncementSection'
import BannerSection from './BannerSection'
import Deferrable from './Deferrable'
import ModalTriggers from './EventModal'
import GameGridSection from './GameGridSection'
import HireBanner from './HireBanner'

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

  const isFocused = useIsFocused()

  useEffect(() => {
    if (username && isLoggedIn) handleCheckShield()
  }, [username, isLoggedIn])

  return (
    <FocusedLocalizationProvider namespace={LANGUAGE_NAMESPACE.MEMBER}>
      <ScrollToTopWrapper>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          sx={{ flex: 1 }}
          contentContainerSx={{ pb: '$1' }}
        >
          <BannerSection />
          <View sx={{ gap: ['$2', '$3'], pt: ['$2', '$3'], px: '$3' }}>
            <AnnouncementSection />
            {/* <HireBanner /> */}
          </View>
          <GameGridSection />
          {isFocused && <Deferrable />}
          <ModalTriggers />
          <ConnectionCheck />
        </ScrollView>
      </ScrollToTopWrapper>
    </FocusedLocalizationProvider>
  )
}
