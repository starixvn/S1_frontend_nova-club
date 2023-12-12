import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'

import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import WebView from 'react-native-webview'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { DEV_DOMAIN } from '../../../../next/config/env'

const Tnc = () => {
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.setting.locale)
  const { t } = useLocalization()
  const retentionDrawBalance = useAppSelector(
    (s) => s.setting.retentionDrawBalance
  )

  const TNC_URL = `${DEV_DOMAIN}/event/retention/tnc?locale=${lang}`
  const { back } = useRouter()
  const { openModal } = useModal()

  useEffect(() => {
    dispatch(TempSettingActions.setIsHomeEventModalTriggered(false))
  }, [])

  return (
    <PageWithBackHeader
      header={{
        title: t('common.tnc'),
        customBack: () => {
          back()
          retentionDrawBalance > 0 && openModal('RetentionDrawModal')
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
