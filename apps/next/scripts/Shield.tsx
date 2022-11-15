import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import Script from 'next/script'
import React, { useEffect } from 'react'
import { ShieldDeviceResultResponse } from 'app/integrations/shield/type'
import useShield from 'app/hooks/useShield'

declare global {
  interface Window {
    getDeviceResult: () => Promise<ShieldDeviceResultResponse>
  }
}

export default function Shield() {
  const dispatch = useAppDispatch()

  // const { autoSyncShield } = useShield()

  // useEffect(() => {
  //   autoSyncShield()
  // }, [autoSyncShield])

  return (
    <Script
      id="shield.com"
      src={`https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=${process.env.NEXT_PUBLIC_SHIELD_SITE_ID}&TYPE=JS&DE=1&AUTO=0`}
      onLoad={() => {
        window.getDeviceResult().then(
          function (res) {
            console.log('Shield Response', res)
            let sessionId = res.result.session_id
            dispatch(SettingActions.setShieldSessionID(sessionId))

            // consume device intelligence

            // let deviceIntelligence = res.result.device_intelligence
            // console.log(deviceIntelligence)
            // ... rest of the code
          },
          function (error) {
            console.log('shield error', error.message)
          }
        )
      }}
    />
  )
}
