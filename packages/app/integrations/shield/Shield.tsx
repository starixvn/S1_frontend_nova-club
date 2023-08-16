import { SHIELD_KEY, SHIELD_SITE_ID } from '@env'
import { ShieldDeviceResult } from 'app/integrations/shield/type'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import ShieldFraud, {
  Config,
  ShieldCallback,
} from 'react-native-shield-fraud-plugin'
import { useDispatch } from 'react-redux'

const Shield = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const callbacks: ShieldCallback = {
      onSuccess: (data) => {
        console.log('SHIELD SUCCESS', data)
        let result: ShieldDeviceResult =
          Platform.OS === 'android' && typeof data === 'string'
            ? JSON.parse(data)
            : data

        dispatch(SettingActions.setShieldSessionID(result.session_id))
      },
      onFailure: (error) => {
        // Handle failure event here
        console.log('Error:', error)
      },
    }
    const config: Config = {
      siteID: SHIELD_SITE_ID,

      secretKey: SHIELD_KEY,
    }

    ShieldFraud.initShield(config, callbacks)
  }, [])

  return null
}

export default Shield
