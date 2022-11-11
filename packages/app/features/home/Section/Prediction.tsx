import useContextualRouting from 'app/hooks/useContextualRouting'
import { useAppSelector } from 'app/provider/redux/store'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'

const Prediction = () => {
  const { openModal } = useModal()

  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const locale = useAppSelector((s) => s.setting.locale)

  useEffect(() => {
    setTimeout(() => {
      dayjs().isBefore(dayjs('2022-12-12')) &&
        openModal('PredictionModal', { onPress: handleNavigate })
    }, 100)
  }, [])

  const handleNavigate = () => {
    const params = {
      locale,
    }
    push(makeContextualHref('/event/wctnc', params), {
      pathname: '/event/wctnc',
      query: params,
    })
  }
  return <></>
}

export default Prediction
