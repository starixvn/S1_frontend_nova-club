import useContextualRouting from 'app/hooks/useContextualRouting'
import { useAppSelector } from 'app/provider/redux/store'
import { AlertActions } from 'app/store/alert.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'

const Prediction = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const locale = useAppSelector((s) => s.setting.locale)
  const showPrediction = useAppSelector((s) => s.tempSetting.showPrediction)

  useEffect(() => {
    setTimeout(() => {
      if (showPrediction) {
        if (dayjs().isBefore(dayjs('2022-12-23T00:00:00+07:00'))) {
          openModal('PredictionModal', {
            onPress: () => {
              push(makeContextualHref('/event/wcwinner'), {
                pathname: '/event/wcwinner',
              })
            },
          })
          dispatch(TempSettingActions.toggleShowPrediction(false))
        } else if (dayjs().isBefore(dayjs('2023-01-17T00:00:00+07:00'))) {
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
  }, [])

  const handleNavigate = () => {
    const params = {
      locale,
    }
    push(makeContextualHref('/event/affcup', params), {
      pathname: '/event/affcup',
      query: { params },
    })
  }
  return <></>
}

export default Prediction
