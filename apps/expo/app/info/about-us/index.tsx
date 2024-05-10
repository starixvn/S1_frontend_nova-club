import { PageWithBackHeader } from 'app/components/layouts/Page'
import { ROOT_DOMAIN } from 'utils/constant/domain'
import useLocalization from 'app/provider/localization'

import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'

const AboutUs = () => {
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()

  const TNC_URL = `${ROOT_DOMAIN}/info/about-us?locale=${lang}`

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
