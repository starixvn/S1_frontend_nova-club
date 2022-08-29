import { DEV_DOMAIN } from '@env'
import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'

const TnC = () => {
  const lang = useAppSelector((state) => state.setting.locale)

  const TNC_URL = `${DEV_DOMAIN}/auth/register/tnc?locale=${lang}`
  console.log('🚀 ~ file: index.tsx ~ line 11 ~ TnC ~ TNC_URL', TNC_URL)

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
        source={{ uri: TNC_URL }}
        startInLoadingState
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  )
}

export default TnC
