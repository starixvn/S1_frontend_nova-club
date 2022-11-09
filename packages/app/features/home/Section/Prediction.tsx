import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'

const Prediction = () => {
  const { openModal } = useModal()

  useEffect(() => {
    setTimeout(() => {
      dayjs().isBefore(dayjs('2022-12-12')) && openModal('PredictionModal')
    }, 100)
  }, [])

  return <></>
}

export default Prediction
