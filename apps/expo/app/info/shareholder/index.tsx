import { DEV_DOMAIN } from '@env'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'

const Shareholder = () => {
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()
  const { bottom } = useSafeArea()

  //   const TNC_URL = `${DEV_DOMAIN}/info/about-us?locale=${lang}`
  const TNC_URL = `https://stage2.gball8.com/info/shareholder?locale=${lang}`

  return (
    <PageWithBackHeader
      header={{ title: t('info.shareholder') }}
      disableScrollView
    >
      <View sx={{ flex: 1, pb: bottom }}>
        <WebView
          source={{ uri: TNC_URL }}
          startInLoadingState
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default Shareholder
