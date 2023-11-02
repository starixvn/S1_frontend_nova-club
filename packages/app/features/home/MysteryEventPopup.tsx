import { useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'

const MysteryEventPopup = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      openModal('MysteryModal')
    }, 1000)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [isLoggedIn])

  return <></>
}

export default MysteryEventPopup
