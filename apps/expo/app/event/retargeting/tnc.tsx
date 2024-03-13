import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import { useRouter } from 'expo-router'
import React from 'react'
import WebView from 'react-native-webview'
import { DEV_DOMAIN } from '../../../../next/config/env'

const Tnc = () => {
  const { t } = useLocalization()
  const { back } = useRouter()

  const TNC_URL = `${DEV_DOMAIN}/event/retargeting/tnc`

  return (
    <PageWithBackHeader
      header={{
        title: t('common.tnc'),
        customBack: () => {
          back()
        },
      }}
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

export default Tnc
