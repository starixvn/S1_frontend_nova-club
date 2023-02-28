import { LIVECHAT_URL } from '@env'
import { CommonActions, useNavigation } from '@react-navigation/native'
import Image from 'app/components/common/Image'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useAlert from 'app/hooks/useAlert'
import useInterval from 'app/hooks/useInterval'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { getSocialMediaScheme, SocialMedia } from 'app/utils/helper'
import { styled, View } from 'dripsy'
import React from 'react'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import { CONTACT_LIST } from '../customerSupport/useSupportItemList'
import { checkMaintenance } from '../splashscreen/splashScreenChecks'
import ResponseContent from './ResponseContent'

const LOGO_IMAGE = require('../../assets/images/logo.png')
const ICON = require('../../assets/images/ic_maintenance.png')

const LIVE_CHAT_DETAIL = CONTACT_LIST.find(
  (c) => c.label === SocialMedia.LIVECHAT
)

const Maintenance = ({}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const { bottom } = useSafeArea()

  const { scheme } = getSocialMediaScheme(SocialMedia.LIVECHAT)
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
Hệ thống của chúng tôi hiện đang bảo trì để nâng cấp trải nghiệm cho quý khách. Vui lòng truy cập lại sau.
Sự kiên nhẫn, thông cảm, và ủng hộ của quý khách là món quà quý giá với chúng tôi.`}
        />
      </View>
      {LIVE_CHAT_DETAIL ? (
        <View key={LIVE_CHAT_DETAIL.label}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(LIVECHAT_URL)
            }}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mb: bottom + 20,
              mr: 20,
            }}
          >
            <View
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                mx: '$2',
              }}
            >
              <SupportIconWrap colors={LIVE_CHAT_DETAIL.bg}>
                <Icon name={'cs'} />
              </SupportIconWrap>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </PageWithBackHeader>
  )
}

const SupportIconWrap = styled(DripsyGradient)(({ size = 45 }) => ({
  borderRadius: size * 0.5,
  borderWidth: 2,
  borderColor: '$PaleBlue',
  m: 1,
  height: size,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}))

export default Maintenance
