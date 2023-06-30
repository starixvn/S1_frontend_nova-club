import IconButton from 'app/components/IconButton'
import { TabBarSelection } from 'app/components/navigation/CustomTabBar'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import AccountVerificationForm from 'app/features/auth/register/AccountVerificationForm'
import RegisterForm from 'app/features/auth/register/RegisterForm'
import useRegisterScreen from 'app/features/auth/register/useRegisterScreen'
import { Row, Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useRef } from 'react'
import { View as RNView } from 'react-native'
import AuthLayout from '../AuthLayout'

type Props = {}

export default function RegisterScreen({}: Props) {
  const rootRef = useRef<RNView>(null)

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

  return (
    <AuthLayout headerDesc="ACCOUNT REGISTRATION">
      <View ref={rootRef} sx={{ overflow: 'hidden', py: 20 }}>
        {/* <Button onPress={onRegisterSuccess}> asdf</Button>
      <Button onPress={onBack}> onBack</Button> */}

        <Row sx={{ flex: 1 }}>
          <MotiView
            state={animationState}
            transition={{
              type: 'timing',
              duration: 400,
            }}
            style={{ width }}
          >
            <View sx={{ width: '100%', minHeight: 60 }}>
              <TabBarSelection
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
          </MotiView>
          <MotiView
            state={animationState}
            transition={{
              type: 'timing',
              duration: 400,
            }}
            style={{ width }}
          >
            <View sx={{ py: 20 }}>
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
                  }}
                >
                  ACCOUNT VERIFICATION
                </Text>
                <IconButton name="back" sx={{ opacity: 0 }} />
              </Row>
              <AccountVerificationForm isAgent={isAgentLogin} formik={formik} />
            </View>
          </MotiView>
        </Row>
      </View>
    </AuthLayout>
  )
}
