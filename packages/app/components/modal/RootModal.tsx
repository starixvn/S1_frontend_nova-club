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
    console.log(
      '🚀 ~ file: RootModal.tsx ~ line 17 ~ useEffect ~ isVisible',
      isVisible
    )
    isVisible && openModal('AlertModal')
  }, [alertList])

  return <View></View>
}

export default RootModal
