import useAlert from 'app/hooks/useAlert'
import { useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { IResponse } from 'services/common/types'
import { useBannerQuery } from 'services/contentApi'
import { useLazyGetEligibleEventCoinQuery } from 'services/rewardApi'
import { EligibleEventCoin } from 'services/rewardApi.type'

const EventPopup = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const { popUpBanner, isSuccess, isError } = useBannerQuery(undefined, {
    selectFromResult: (d) => {
      return {
        popUpBanner:
          d.data?.filter((el) => el.banner_display_page === 'popup') ?? [],
        ...d,
      }
    },
  })

  const [getEligibleEventCoin] = useLazyGetEligibleEventCoinQuery()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const showPopup = useAppSelector((s) => s.tempSetting.triggerPopupEvent)
  const showChristmasPopup = useAppSelector(
    (s) => s.tempSetting.triggerPopupChristmasEvent
  )
  const isChristmasPopUpTriggered = useAppSelector(
    (s) => s.tempSetting.isChristmasPopUpTriggered
  )
  const [eligibleChristmasEvent, setEligibleChristmasEvent] = useState(false)
  const showTutorial = useAppSelector((s) => s.setting.triggerPopupTutorial)

  const CheckEligibleEventCoin = async () => {
    try {
      const { success, data } = await getEligibleEventCoin().unwrap()

      if (success && data) {
        const isChristmasEvent = data.list.some((e) => {
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
    if (isLoggedIn && !isChristmasPopUpTriggered) CheckEligibleEventCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isChristmasPopUpTriggered])

  useEffect(() => {
    if (
      (isSuccess || isError) &&
      popUpBanner.length === 0 &&
      !isChristmasPopUpTriggered
    ) {
      // trigger xmas pop up if no popupBanner to sequence
      dispatch(TempSettingActions.toggleTriggerPopupChristmasEvent(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isChristmasPopUpTriggered])

  useEffect(() => {
    if (isLoggedIn && !showTutorial) {
      if (showPopup && popUpBanner.length > 0) {
        const setTimeoutId = setTimeout(() => {
          openModal('EventPopupModal')
          dispatch(TempSettingActions.toggleTriggerPopupEvent(false))
        }, 500)

        return () => {
          clearTimeout(setTimeoutId)
        }
      }

      // showChristmasPopup will be true after EventPopupModal has been closed
      // or when popUpBanner length is 0
      else if (
        showChristmasPopup &&
        eligibleChristmasEvent &&
        !isChristmasPopUpTriggered
      ) {
        openModal('ChristmasGiftModal')
        dispatch(TempSettingActions.toggleTriggerPopupChristmasEvent(false))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoggedIn,
    showPopup,
    showTutorial,
    popUpBanner,
    showChristmasPopup,
    isChristmasPopUpTriggered,
  ])

  return <></>
}

export default EventPopup
