import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEVICE_ID } from 'app/constants/storage'
import { useAppDispatch } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { useEffect } from 'react'
import generateUniqueId from './generateUniqueId'

/*
  - Manually store device id into local storage / async storage instead of Redux Persist. 
  - Redux Persist when changed version will reset the stored value, causing device id to regenerate on web
*/

export default function RegisterUniqueId() {
  const dispatch = useAppDispatch()

  async function hydrateUniqueId() {
    let di = ''
    try {
      const value = await AsyncStorage.getItem(DEVICE_ID)
      if (value) {
        di = value
      } else throw new Error()
    } catch (e) {
      const uuid = await generateUniqueId()
      AsyncStorage.setItem(DEVICE_ID, uuid)

      di = uuid
    } finally {
      /*  retrieve value from Async Storage for app will be asynchronous,
          hydrate to redux store so value is now synchronously accessible. 
          particularly at axiosInstance
      */
      dispatch(TempSettingActions.setDeviceId(di))
    }
  }

  useEffect(() => {
    hydrateUniqueId()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
