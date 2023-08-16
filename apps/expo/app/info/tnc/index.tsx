import { DEV_DOMAIN } from '../../../../../apps/next/config/env'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'

import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'

const Tnc = () => {
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()

  const TNC_URL = `${DEV_DOMAIN}/info/tnc?locale=${lang}`

  return (
    <PageWithBackHeader header={{ title: t('common.tnc') }} disableScrollView>
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

export default Tnc
