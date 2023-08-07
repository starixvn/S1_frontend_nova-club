import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import { MotiView } from 'moti'
import { useEffect, useRef } from 'react'
import { Platform, View as RNView } from 'react-native'
import { useModal } from 'react-native-modalfy'
import AuthLayout from '../AuthLayout'
import AccountVerificationForm from './AccountVerificationForm'
import RegisterForm from './RegisterForm'
import useRegisterScreen, { Register_Screen } from './useRegisterScreen'

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
  const { closeModal, openModal, currentModal } = useModal()

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
    currentScreen,
  } = useRegisterScreen(rootRef)

  useEffect(() => {
    if (currentModal === 'LuckyDrawModal') {
      closeModal('LuckyDrawModal')
    }

    let openLuckyDrawModalInstance: NodeJS.Timeout

    if (Platform.OS === 'web') {
      openLuckyDrawModalInstance = setTimeout(() => {
        openModal('LuckyDrawModal')
      }, 1000)
    }

    return () => {
      if (openLuckyDrawModalInstance) {
        clearTimeout(openLuckyDrawModalInstance)
      }
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

          <View sx={{ width: '100%', maxWidth: 600 }}>
            <RegisterForm
              isAgent={isAgentLogin}
              formik={formik}
              onSuccess={onRegisterSuccess}
            />
          </View>
        </AuthLayout>
      </MotiView>

      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 400,
        }}
        style={[
          {
            width,
          },
          Platform.select({
            web: {
              display:
                currentScreen === Register_Screen.ACCOUNT_VERIFICATION
                  ? 'flex'
                  : 'none',
            },
          }),
        ]}
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
