import { PageWithBackHeader } from 'app/components/layouts/Page'
import { ROOT_DOMAIN } from 'app/constants/domain'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'

const MidAutumnTnc = () => {
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()
  const TNC_URL = `${ROOT_DOMAIN}/event/mid-autumn-tnc?locale=${lang}`

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

export default MidAutumnTnc
