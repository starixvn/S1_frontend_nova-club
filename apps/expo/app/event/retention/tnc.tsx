import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { View } from 'dripsy'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import WebView from 'react-native-webview'
import { DEV_DOMAIN } from '../../../../next/config/env'

const Tnc = () => {
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()
  const { back } = useRouter()

  const TNC_URL = `${DEV_DOMAIN}/event/retention/tnc?locale=${lang}`

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
