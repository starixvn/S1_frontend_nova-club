import useContextualRouting from 'app/hooks/useContextualRouting'
import { useAppSelector } from 'app/provider/redux/store'
import { AlertActions } from 'app/store/alert.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import dayjs from 'dayjs'
import React, { useEffect, useRef } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { LoginResult } from 'services/authApi.type'
import { useRouter } from 'solito/router'

const Prediction = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const locale = useAppSelector((s) => s.setting.locale)
  const showPrediction = useAppSelector((s) => s.tempSetting.showPrediction)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (showPrediction) {
        if (dayjs().isBefore(dayjs('2023-01-17T00:00:00+07:00'))) {
          openModal('AffCupModal', {
            onPress: () => {
              push(makeContextualHref('/event/affcup'), {
                pathname: '/event/affcup',
              })
            },
          })
          dispatch(TempSettingActions.toggleShowPrediction(false))
        }
      }
    }, 1000)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [])

  return <></>
}

export default Prediction
