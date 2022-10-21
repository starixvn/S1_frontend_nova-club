import { CommonActions, useNavigation } from '@react-navigation/native'
import Image from 'app/components/common/Image'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useAlert from 'app/hooks/useAlert'
import useInterval from 'app/hooks/useInterval'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { useDispatch } from 'react-redux'
import { checkMaintenance } from '../splashscreen/splashScreenChecks'
import ResponseContent from './ResponseContent'

const LOGO_IMAGE = require('../../assets/images/logo.png')
const ICON = require('../../assets/images/ic_maintenance.png')

const Maintenance = ({}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  async function checkAlive() {
    const result = await checkMaintenance({
      navigation,
      dispatch,
      t,
      showAlert,
    })()

    if (result.result) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        })
      )
    }
  }
  useInterval(() => {
    checkAlive()
  }, 5000)

  return (
    <PageWithBackHeader
      header={{ title: 'Maintenance' }}
      disableScrollView
      hideHeader
    >
      <View
        sx={{
          flex: 1,
          paddingTop: '40%',
          alignItems: 'center',
        }}
      >
        <Image
          source={LOGO_IMAGE}
          style={{ height: 100, width: '100%' }}
          resizeMode="contain"
        />
        <ResponseContent
          icon={ICON}
          title="HỆ THỐNG ĐANG BẢO TRÌ"
          subtitle="Trang web hiện không truy cập được do bảo trì"
          content={`Quý khách hàng thân mến,
Hệ thống của chúng tôi hiện đang bảo trì đểnâng cấp trải nghiệm cho quý khách. Vui lòng truy cập lại sau.
Sự kiên nhẫn, thông cảm, và ủng hộ của quý khách là món quà quý giá với chúng tôi.`}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default Maintenance
