import IconButton from 'app/components/IconButton'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { LoginType } from 'app/features/auth/AuthTypeSelection'
import ForgotPasswordForm from 'app/features/auth/forgotPassword/ForgotPasswordForm'
import ResetPasswordForm from 'app/features/auth/forgotPassword/ResetPasswordForm'
import useForgotPassword, {
  ForgotPassword_Screen,
} from 'app/features/auth/forgotPassword/hook/useForgotPassword'
import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { Row, Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useRef } from 'react'
import { View as RNView } from 'react-native'
import { ModalComponentProp } from 'react-native-modalfy'
import AuthLayout from '../AuthLayout'

type Props = ModalComponentProp<ModalStackParams, void, 'ForgotPasswordModal'>

export default function ForgotPasswordScreen({ modal }: Props) {
  const rootRef = useRef<RNView>(null)
  const { t } = useLocalization()
  const modalType = modal?.getParam('t', LoginType.Member)

  const {
    animationState,
    width,
    formik,
    onForgotPasswordSubmit,
    onBack,
    isAgentLogin,
    isAgentLoading,
    isAgentSuccess,
    agentSendOTP,
    currentScreen,
  } = useForgotPassword(rootRef, modalType)

  return (
    <AuthLayout
      sx={{ mt: modal ? 0 : '$5' }}
      headerDesc={t('authentication.forgotPasswordHeader')}
      isAbleToClose={Boolean(modal)}
    >
      <View ref={rootRef} sx={{ overflow: 'hidden', flex: 1 }}>
        <Row sx={{ flex: 1 }}>
          <MotiView
            state={animationState}
            transition={{
              type: 'timing',
              duration: 400,
            }}
            style={{ width: '100%' }}
          >
            <ForgotPasswordForm
              sx={{
                flex: 1,
                pt: 52,
              }}
              formik={formik}
              onCodeSubmit={onForgotPasswordSubmit}
              isAgentLogin={isAgentLogin}
              isAgentLoading={isAgentLoading}
              isAgentSuccess={isAgentSuccess}
              agentSendOTP={agentSendOTP}
            />
          </MotiView>

          <MotiView
            state={animationState}
            transition={{
              type: 'timing',
              duration: 400,
            }}
            style={{
              width,
              /** If user at `getOtp` section and press `Tab` key until `setPassword` section,
               * then the UI of `setPassword` section will be focused on the screen althought it
               * has the CSS `translateX` out of screen. It shouldn't show `setPassword` section
               * when user using `Tab` key.
               *
               * Solution: Setting `display: none`
               */
              display:
                currentScreen === ForgotPassword_Screen.SET_NEW_PASSWORD
                  ? 'flex'
                  : 'none',
            }}
          >
            <View sx={{ pt: 20, flex: 1 }}>
              <Row
                sx={{
                  px: '$pagePadding',
                  mb: '$pagePadding',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <IconButton name="back" onPress={onBack} />
                <Text
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    mt: FONT_TOP_OFFSET,
                    textTransform: 'uppercase',
                  }}
                >
                  {t('authentication.resetPasswordHeader')}
                </Text>
                <IconButton name="back" sx={{ opacity: 0 }} />
              </Row>

              <ResetPasswordForm formik={formik} sx={{ flex: 1 }} />
            </View>
          </MotiView>
        </Row>
      </View>
    </AuthLayout>
  )
}
