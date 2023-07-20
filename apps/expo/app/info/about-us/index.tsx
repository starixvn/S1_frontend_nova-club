import { DEV_DOMAIN } from '@env'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'

import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'

const AboutUs = () => {
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()

  //   const TNC_URL = `${DEV_DOMAIN}/info/about-us?locale=${lang}`
  const TNC_URL = `https://stage2.gball8.com/info/about-us?locale=${lang}`

  return (
    <PageWithBackHeader
      header={{ title: t('footer.aboutUs') }}
      disableScrollView
    >
      <View sx={{ flex: 1 }}>
        <WebView
          source={{ uri: TNC_URL }}
          startInLoadingState
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default AboutUs
