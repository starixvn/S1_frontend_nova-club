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

  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const locale = useAppSelector((s) => s.setting.locale)
  const showPrediction = useAppSelector((s) => s.tempSetting.showPrediction)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (showPrediction) {
        openModal('AffCupModal')
        dispatch(TempSettingActions.toggleShowPrediction(true))
      }
    }, 1000)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [])

  return <></>
}

export default EventPopup
