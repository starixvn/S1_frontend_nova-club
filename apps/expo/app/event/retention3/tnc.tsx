import { PageWithBackHeader } from 'app/components/layouts/Page'
import { ROOT_DOMAIN } from 'utils/constant/domain'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import { useRouter } from 'expo-router'
import React from 'react'
import WebView from 'react-native-webview'

const Tnc = () => {
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()
  const { back } = useRouter()

  const TNC_URL = `${ROOT_DOMAIN}/event/retention3/tnc?locale=${lang}`

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
