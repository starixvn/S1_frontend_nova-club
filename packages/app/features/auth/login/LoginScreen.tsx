import CustomTabBar from 'app/components/navigation/CustomTabBar'
import { View } from 'dripsy'
import React, { useEffect, useMemo, useState } from 'react'
import { createParam } from 'solito'
import AuthLayout from '../AuthLayout'
import { LoginType } from '../AuthTypeSelection'
import LoginForm from './LoginForm'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'solito/router'

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

  const { replace } = useRouter()

  const [routes, setRoutes] = useState([memberRoute, agentRoute])

  const [type, setType] = useParam('t', { initial: LoginType.Member })
  const [index, setIndex] = useState(0)

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])

  const handlePress = (value) => {
    if (agentToken) {
      replace('/agent/profile')
    }
    setType(value === 0 ? LoginType.Member : LoginType.Agent)
    setIndex(value)
  }

  useEffect(() => {
    const initT = routes.find((e) => {
      return e.type === type
    })
    if (initT) setIndex(initT.index)

    if (memberToken) setRoutes([agentRoute])
  }, [])

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
    </AuthLayout>
  )
}
