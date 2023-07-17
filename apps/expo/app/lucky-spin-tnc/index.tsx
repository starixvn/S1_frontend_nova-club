import { DEV_DOMAIN } from '@env'
import { PageWithBackHeader } from 'app/components/layouts/Page'

import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import { useRouter } from 'expo-router'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import WebView from 'react-native-webview'

const Tnc = () => {
  const lang = useAppSelector((state) => state.setting.locale)

  //   const TNC_URL = `${DEV_DOMAIN}/info/about-us?locale=${lang}`
  const TNC_URL = `https://stage2.gball8.com/lucky-spin-tnc?locale=${lang}`
  const { back } = useRouter()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      header={{
        title: 'LuckySpinTnc',
        customBack: () => {
          back()
          openModal('LuckyDrawModal')
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
