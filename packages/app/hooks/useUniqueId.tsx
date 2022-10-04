import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { getUniqueId, getManufacturer } from 'react-native-device-info'
import { useDispatch } from 'react-redux'

const useUniqueId = () => {
  const dispatch = useDispatch()
  const uuid = useAppSelector((s) => s.setting.platformUUID)

  const getDeviceUniqueId = async () => {
    const uniqueId = await getUniqueId()

    dispatch(SettingActions.setPlatformUUID(uniqueId))
  }

  const getWebUniqueId = () => {
    let uuid = self.crypto.randomUUID()

    dispatch(SettingActions.setPlatformUUID(uuid))
  }

  useEffect(() => {
    !!!uuid
      ? Platform.OS === 'web'
        ? getWebUniqueId()
        : getDeviceUniqueId()
      : null
  }, [])

  return {
    uuid,
  }
}

export default useUniqueId
