import IconButton from 'app/components/IconButton'
import { TabBarSelection } from 'app/components/navigation/CustomTabBar'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import AccountVerificationForm from 'app/features/auth/register/AccountVerificationForm'
import RegisterForm from 'app/features/auth/register/RegisterForm'
import useRegisterScreen, {
  Register_Screen,
} from 'app/features/auth/register/useRegisterScreen'
import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { Row, Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useRef } from 'react'
import { View as RNView } from 'react-native'
import { ModalComponentProp } from 'react-native-modalfy'
import AuthLayout from '../AuthLayout'

type Props = ModalComponentProp<ModalStackParams, void, 'RegisterModal'>

export default function RegisterScreen({ modal }: Props) {
  const rootRef = useRef<RNView>(null)
  const { t } = useLocalization()

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

  return (
    <AuthLayout
      sx={{ mt: modal ? 0 : '$5' }}
      headerDesc={t('authentication.accountReg')}
      isAbleToClose={Boolean(modal)}
      isAgent={isAgentLogin}
    >
      <View ref={rootRef} sx={{ overflow: 'hidden', flex: 1, pt: '$4' }}>
        <Row sx={{ flex: 1 }}>
          <MotiView
            state={animationState}
            transition={{
              type: 'timing',
              duration: 400,
            }}
            style={{ width: '100%' }}
          >
            <View>
              <TabBarSelection
                currentIndex={index}
                onPress={handlePress}
                routes={routes}
                buttonProps={{
                  sx: {
                    pb: 0,
                  },
                }}
                buttonTextProps={{
                  sx: {
                    py: 0,
                  },
                }}
              />
            </View>
            <RegisterForm
              isAgent={isAgentLogin}
              formik={formik}
              onSuccess={onRegisterSuccess}
              sx={{
                flex: 1,
              }}
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
              display:
                currentScreen === Register_Screen.ACCOUNT_VERIFICATION
                  ? 'flex'
                  : 'none',
            }}
          >
            <View sx={{ flex: 1 }}>
              <Row
                sx={{
                  px: '$pagePadding',
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
                  {t('authentication.accVerification')}
                </Text>
                <IconButton name="back" sx={{ opacity: 0 }} />
              </Row>
              <AccountVerificationForm
                isAgent={isAgentLogin}
                formik={formik}
                modal={modal}
                sx={{ flex: 1 }}
              />
            </View>
          </MotiView>
        </Row>
      </View>
    </AuthLayout>
  )
}
