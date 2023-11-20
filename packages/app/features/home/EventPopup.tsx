import { useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useBannerQuery } from 'services/contentApi'

const EventPopup = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const { data } = useBannerQuery()
  const popUpBanner =
    data?.filter((el) => el.banner_display_page === 'popup') ?? []

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const showPopup = useAppSelector((s) => s.tempSetting.triggerPopupEvent)
  const showTutorial = useAppSelector((s) => s.setting.triggerPopupTutorial)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn && showPopup && !showTutorial && popUpBanner.length > 0) {
        openModal('EventPopupModal')
        dispatch(TempSettingActions.toggleTriggerPopupEvent(false))
      }
    }, 500)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [isLoggedIn, showPopup, showTutorial, popUpBanner])

  return <></>
}

export default EventPopup
