import useContextualRouting from 'app/hooks/useContextualRouting'
import { useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'

const EventPopup = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const showPrediction = useAppSelector((s) => s.tempSetting.showPrediction)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (showPrediction) {
        openModal('EventPopupModal')
        dispatch(TempSettingActions.toggleShowPrediction(false))
      }
    }, 1000)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [])

  return <></>
}

export default EventPopup
