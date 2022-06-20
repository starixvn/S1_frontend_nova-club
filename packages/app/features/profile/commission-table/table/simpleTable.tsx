import { View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'
import { DEV_DOMAIN } from '@env'

const COMMISSION_TABLE_URL = DEV_DOMAIN + '/profile/commission-table'

const SimpleTable = () => {
  // Used to hide the header inside webview
  const INJECTED_JAVASCRIPT = `
  window.addEventListener('load', () => {
    const header = document.getElementById('pageback-header')
    if (header) {
      header.style.display = 'none'
    }
  })
  `

  return (
    <View sx={{ flex: 1 }}>
      <WebView
        injectedJavaScript={INJECTED_JAVASCRIPT}
        source={{ uri: COMMISSION_TABLE_URL }}
        startInLoadingState
      />
    </View>
  )
}

export default SimpleTable
