import CustomTabBar from 'app/components/navigation/CustomTabBar'
import { P, View } from 'dripsy'
import { MotiView } from 'moti'
import { useEffect, useRef, useState } from 'react'
import { Platform, View as RNView } from 'react-native'
import AuthLayout from '../AuthLayout'
import AccountVerificationForm from './AccountVerificationForm'
import RegisterForm from './RegisterForm'
import useRegisterScreen, { Register_Screen } from './useRegisterScreen'
import { useModal } from 'react-native-modalfy'
import useLocalization from 'app/provider/localization'

export type RegisterFormValues = {
  username: string
  password: string
  confirmPassword: string
  contactNumber: string
  verifyCode: string
  terms: boolean
}

const RegisterScreen = () => {
  const rootRef = useRef<RNView>(null)
  const { t } = useLocalization()
  const { closeModal, openModal } = useModal()

  const {
    animationState,
    width,
    routes,
    index,
    handlePress,
    isAgentLogin,
    formik,
    onRegisterSuccess,
    onBack,
  } = useRegisterScreen(rootRef)

  useEffect(() => {
    closeModal('LuckyDrawModal')
    if (Platform.OS === 'web') {
      setTimeout(() => {
        openModal('LuckyDrawModal')
      }, 1000)
    }
  }, [])

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
        <AuthLayout headerDesc={t('authentication.accountReg')}>
          <View sx={{ width: '100%' }}>
            <CustomTabBar
              currentIndex={index}
              onPress={handlePress}
              routes={routes}
            />
          </View>

          <RegisterForm
            isAgent={isAgentLogin}
            formik={formik}
            onSuccess={onRegisterSuccess}
          />
        </AuthLayout>
      </MotiView>

      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 400,
        }}
        style={{
          width,
        }}
      >
        <AuthLayout
          onBack={onBack}
          headerDesc={t('authentication.accVerification')}
        >
          <AccountVerificationForm isAgent={isAgentLogin} formik={formik} />
        </AuthLayout>
      </MotiView>
    </View>
  )
}

export default RegisterScreen
