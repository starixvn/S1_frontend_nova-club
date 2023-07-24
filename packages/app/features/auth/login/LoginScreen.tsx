import CustomTabBar from 'app/components/navigation/CustomTabBar'
import { View } from 'dripsy'
import React, { useEffect, useMemo, useState } from 'react'
import { createParam } from 'solito'
import AuthLayout from '../AuthLayout'
import { LoginType } from '../AuthTypeSelection'
import LoginForm from './LoginForm'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'solito/router'

const { useParam } = createParam<{ t: LoginType }>()

export default function LoginScreen() {
  const agentToken = useAppSelector((s) => s.agent.access_token)
  const memberToken = useAppSelector((state) => state.auth.info?.token)

  const { replace } = useRouter()

  const [routes] = useState([
    { key: 'first', title: 'common.player', index: 0, type: LoginType.Member },
    { key: 'second', title: 'common.agent', index: 1, type: LoginType.Agent },
  ])

  const [type, setType] = useParam('t', { initial: LoginType.Member })
  console.log('🚀 ~ file: LoginScreen.tsx:25 ~ LoginScreen ~ type:', type)
  const [index, setIndex] = useState(0)

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])
  console.log(
    '🚀 ~ file: LoginScreen.tsx:28 ~ LoginScreen ~ isAgentLogin:',
    isAgentLogin
  )

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
  }, [])

  return (
    <AuthLayout headerDesc={'login to your account'} headerColor={'black'}>
      <View sx={{ width: '100%' }}>
        <CustomTabBar
          currentIndex={index}
          onPress={handlePress}
          routes={routes}
        />
      </View>
      <View>
        <LoginForm isAgent={isAgentLogin} />
      </View>
    </AuthLayout>
  )
}
