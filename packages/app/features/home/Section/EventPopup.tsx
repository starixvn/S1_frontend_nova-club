import { useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'

const EventPopup = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const showPopup = useAppSelector((s) => s.tempSetting.triggerPopupEvent)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn && showPopup) {
        openModal('EventPopupModal')
        dispatch(TempSettingActions.toggleTriggerPopupEvent(false))
      }
    }, 1000)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [])

  return <></>
}

export default EventPopup
