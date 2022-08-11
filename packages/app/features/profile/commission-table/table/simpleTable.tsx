import { View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'
import { DEV_DOMAIN } from '@env'

const COMMISSION_TABLE_URL = DEV_DOMAIN + '/profile/commission-table'

const SimpleTable = () => {
  // Used to hide the header inside webview
  const INJECTED_JAVASCRIPT = `
  window.addEventListener('load', () => {
    setTimeout(() => {
      const header = document.getElementById('pageback-header')

      if (header) {
        header.style.display = 'none'
      }
    })
  })
  `

  const onMessage = () => {}

  return (
    <View sx={{ flex: 1 }}>
      <WebView
        onMessage={onMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        source={{ uri: COMMISSION_TABLE_URL }}
        startInLoadingState
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  )
}

export default SimpleTable
