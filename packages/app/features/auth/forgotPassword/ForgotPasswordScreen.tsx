import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import { MotiView } from 'moti'
import { ElementRef, useRef } from 'react'
import AuthLayout from '../AuthLayout'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'
import useForgotPassword from './hook/useForgotPassword'
import useAgentForgotPassword from './hook/useAgentForgotPassword'

const ForgotPasswordScreen = () => {
  const { t } = useLocalization()
  const rootRef = useRef<ElementRef<typeof View>>(null)

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
  } = useForgotPassword(rootRef)

  return (
    <View
      ref={rootRef}
      sx={{ flexDirection: 'row', flex: 1, overflow: 'hidden' }}
    >
      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 400,
        }}
        style={{ width }}
      >
        <AuthLayout headerDesc={t('authentication.forgotPasswordHeader')}>
          <ForgotPasswordForm
            formik={formik}
            onCodeSubmit={onForgotPasswordSubmit}
            isAgentLogin={isAgentLogin}
            isAgentLoading={isAgentLoading}
            isAgentSuccess={isAgentSuccess}
            agentSendOTP={agentSendOTP}
          />
        </AuthLayout>
      </MotiView>

      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 400,
        }}
        style={{ width }}
      >
        <AuthLayout
          headerDesc={t('authentication.resetPasswordHeader')}
          onBack={onBack}
        >
          <ResetPasswordForm formik={formik} />
        </AuthLayout>
      </MotiView>
    </View>
  )
}

export default ForgotPasswordScreen
