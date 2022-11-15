import { SHIELD_KEY, SHIELD_SITE_ID } from '@env'
import useShield from 'app/hooks/useShield'
import { ShieldDeviceResult } from 'app/integrations/shield/type'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import ShieldFD from 'react-native-shield'
import { useDispatch } from 'react-redux'

const Shield = () => {
  const dispatch = useDispatch()

  // const { autoSyncShield } = useShield()

  // useEffect(() => {
  //   autoSyncShield()
  // }, [autoSyncShield])

  useEffect(() => {
    ShieldFD.initShield(
      SHIELD_SITE_ID,
      SHIELD_KEY,
      (r: ShieldDeviceResult | string) => {
        console.log('SHIELD SUCCESS', r)
        let result: ShieldDeviceResult =
          Platform.OS === 'android' && typeof r === 'string' ? JSON.parse(r) : r

        dispatch(SettingActions.setShieldSessionID(result.session_id))
      },
      (e) => {
        console.log('SHEILD ERROR', e)
      }
    )
  }, [])
  return null
}

export default Shield
