import { useAppDispatch } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import Script from 'next/script'
import React from 'react'
import { ShieldDeviceResultResponse } from 'app/integrations/shield/type'

declare global {
  interface Window {
    getDeviceResult: () => Promise<ShieldDeviceResultResponse>
  }
}

export default function Shield() {
  const dispatch = useAppDispatch()
  return (
    <Script
      id="shield.com"
      src={`https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=${process.env.SHIELD_SITE_ID}&TYPE=JS&DE=1&AUTO=0`}
      onLoad={() => {
        window.getDeviceResult().then(
          function (res) {
            // console.log('Shield Response', res)
            let sessionId = res.result.session_id
            dispatch(SettingActions.setShieldSessionID(sessionId))

            // consume device intelligence

            // let deviceIntelligence = res.result.device_intelligence
            // console.log(deviceIntelligence)
            // ... rest of the code
          },
          function (error) {
            console.log(error.message)
          }
        )
      }}
    />
  )
}
