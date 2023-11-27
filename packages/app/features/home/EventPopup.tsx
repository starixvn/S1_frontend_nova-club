import useAlert from 'app/hooks/useAlert'
import { useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { Shield_Action } from 'services/authApi.type'
import { IResponse } from 'services/common/types'
import { useBannerQuery } from 'services/contentApi'
import { useLazyGetEligibleEventCoinQuery } from 'services/rewardApi'
import { EligibleEventCoin } from 'services/rewardApi.type'

const EventPopup = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const { data } = useBannerQuery()
  const [getEligibleEventCoin] = useLazyGetEligibleEventCoinQuery()
  const syncShieldActionType =
    useAppSelector((s) => s.tempSetting.syncShieldActionType) ?? ''
  const popUpBanner =
    data?.filter((el) => el.banner_display_page === 'popup') ?? []

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const showPopup = useAppSelector((s) => s.tempSetting.triggerPopupEvent)
  const showChristmasPopup = useAppSelector(
    (s) => s.tempSetting.triggerPopupChristmasEvent
  )
  const [eligibleChristmasEvent, setEligibleChristmasEvent] = useState(false)

  const showTutorial = useAppSelector((s) => s.setting.triggerPopupTutorial)

  const { showAlert } = useAlert()

  const CheckEligibleEventCoin = async () => {
    try {
      const { success, data } = await getEligibleEventCoin()
        .unwrap()
        .catch((e: IResponse<EligibleEventCoin>) => {
          if (
            syncShieldActionType === Shield_Action.REGISTER && // Dont show freespin error message if player is not from register flow
            e.code !== 28004 // 28004 code = no event is active, ignore the message
          ) {
            showAlert(e.message)
          }
          return e
        })

      if (success && data) {
        const isChristmasEvent = data.list.map((e) => {
          return e.event_code === 'upload2'
        })

        if (isChristmasEvent) {
          setEligibleChristmasEvent(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    CheckEligibleEventCoin()
  }, [])

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn && showPopup && !showTutorial && popUpBanner.length > 0) {
        openModal('EventPopupModal')
        dispatch(TempSettingActions.toggleTriggerPopupEvent(false))
      }
    }, 500)

    if (showChristmasPopup && eligibleChristmasEvent) {
      openModal('ChristmasGiftModal')
      dispatch(TempSettingActions.toggleTriggerPopupChristmasEvent(false))
    }

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [isLoggedIn, showPopup, showTutorial, popUpBanner, showChristmasPopup])

  return <></>
}

export default EventPopup
