import CustomTabBar from 'app/components/navigation/CustomTabBar'
import { View } from 'dripsy'
import React, { useEffect, useMemo, useState } from 'react'
import { createParam } from 'solito'
import AuthLayout from '../AuthLayout'
import { LoginType } from '../AuthLayout'
import LoginForm from './LoginForm'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'solito/router'
import IconButton from 'app/components/IconButton'
import { Platform } from 'react-native'
import useLoginProcess from './useLoginProcess'

export const memberRoute = {
  key: 'first',
  title: 'common.player',
  index: 0,
  type: LoginType.Member,
}

export const agentRoute = {
  key: 'second',
  title: 'common.agent',
  index: 1,
  type: LoginType.Agent,
}

const { useParam } = createParam<{ t: LoginType }>()

export default function LoginScreen() {
  const { t } = useLocalization()

  const agentToken = useAppSelector((s) => s.agent.access_token)
  const memberToken = useAppSelector((state) => state.auth.info?.token)
  const biometricCredentials = useAppSelector(
    (s) => s.setting.biometricCredentials
  )

  const { replace } = useRouter()

  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false)

  const paramObj = useParam('t') // dont set initial value, so can wait till first render to get exact value
  const [type, setType] = paramObj
  const [index, setIndex] = useState(0)

  const isAgentLogin = type === LoginType.Agent
  const { checkBiometricEnabled, loginWithBiometric } = useLoginProcess()

  useEffect(() => {
    const checkBiometric = async () => {
      const biometricAvailable = await checkBiometricEnabled()

      setIsBiometricAvailable(!!biometricAvailable)
    }

    Platform.OS !== 'web' && checkBiometric()
  }, [])

  const handlePress = (value) => {
    if (agentToken) {
      replace('/agent/profile')
    }
    setType(value === 0 ? LoginType.Member : LoginType.Agent)
    setIndex(value)
  }

  const routes = useMemo(
    () => (memberToken ? [agentRoute] : [memberRoute, agentRoute]),
    [memberToken]
  )

  useEffect(() => {
    if (!type) setIndex(0)
    // skip 1 frame for useParam to be able to grab value from query
    else if (type) {
      const initT = routes.find((e) => {
        return e.type === type
      })
      if (initT) setIndex(initT.index)

      if (memberToken && type !== 'agent') replace('/')
    }
  }, [type])

  return (
    <AuthLayout
      headerDesc={
        isAgentLogin
          ? t('authentication.loginAgentHeader')
          : t('authentication.loginHeader')
      }
      headerColor={'black'}
    >
      <View sx={{ width: '100%' }}>
        <CustomTabBar
          currentIndex={index}
          onPress={handlePress}
          routes={routes}
        />
      </View>

      <View sx={{ width: '100%', maxWidth: 600 }}>
        <LoginForm isAgent={isAgentLogin} />
      </View>

      {Platform.OS !== 'web' &&
        !!biometricCredentials &&
        isBiometricAvailable && (
          <View sx={{ mt: '$4', mb: '$5' }}>
            <IconButton
              name={Platform.OS === 'ios' ? 'face-id' : 'fingerprint'}
              size={36}
              onPress={loginWithBiometric}
            />
          </View>
        )}
    </AuthLayout>
  )
}
