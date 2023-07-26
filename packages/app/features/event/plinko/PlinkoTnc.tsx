import { DEV_DOMAIN } from '@env'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'

const PlinkoTnc = () => {
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()
  const TNC_URL = `${DEV_DOMAIN}/event/plinko-tnc?locale=${lang}`

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
    <PageWithBackHeader header={{ title: t('menu.tnc') }} disableScrollView>
      <View sx={{ flex: 1 }}>
        <WebView
          onMessage={onMessage}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          source={{ uri: TNC_URL }}
          startInLoadingState
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default PlinkoTnc
