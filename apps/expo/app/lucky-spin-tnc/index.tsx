import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'

import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import { useRouter } from 'expo-router'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import WebView from 'react-native-webview'
import { DEV_DOMAIN } from '../../../next/config/env'

const Tnc = () => {
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()
  const luckyDrawBalance = useAppSelector((s) => s.setting.luckyDrawBalance)

  const TNC_URL = `${DEV_DOMAIN}/lucky-spin-tnc?locale=${lang}`
  const { back } = useRouter()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      header={{
        title: t('common.tnc'),
        customBack: () => {
          back()
          luckyDrawBalance > 0 && openModal('LuckyDrawModal')
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
