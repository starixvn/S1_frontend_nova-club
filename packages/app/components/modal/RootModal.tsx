import { RootState } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useSelector } from 'react-redux'

const RootModal = () => {
  const { openModal } = useModal()

  const alertList = useSelector((s: RootState) => s.alert.data)
  const alert = alertList ? alertList[0] : undefined

  const isVisible = alert != null && !alert.isDismissed

  useEffect(() => {
    setTimeout(() => {
      isVisible && openModal('AlertModal', { persistent: alert.persistent })
    }, 350)
  }, [alert])

  return <View></View>
}

export default RootModal
