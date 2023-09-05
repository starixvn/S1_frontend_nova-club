'use client'

import { useEffect } from 'react'
import { configureAxios } from 'services/common/axiosInstance'
import { store } from './provider/redux/store'
import { RewardPostMessageType } from 'utils/rewards'

export default function Setup() {
  useEffect(() => {
    configureAxios({
      store: store,
      onTokenExpired: async () => {
        const payload = JSON.stringify({
          type: RewardPostMessageType.sessionExpired,
        })
        if (window.ReactNativeWebView)
          window.ReactNativeWebView.postMessage(payload)
        else window.parent.postMessage(payload)
      },
    })
  }, [])

  return null
}
