import CustomTabBar from 'app/components/navigation/CustomTabBar'
import { View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { createParam } from 'solito'
import AuthLayout from '../AuthLayout'
import { LoginType } from '../AuthTypeSelection'
import LoginForm from './LoginForm'

const { useParam } = createParam<{ t: LoginType }>()

export default function LoginScreen() {
  const [routes] = useState([
    { key: 'first', title: 'common.player', index: 0 },
    { key: 'second', title: 'common.agent', index: 1 },
  ])

  const [type, setIsAgentLogin] = useParam('t', { initial: LoginType.Member })
  const [index, setIndex] = useState(0)

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])

  const handlePress = (value) => {
    setIsAgentLogin(index === 0 ? LoginType.Agent : LoginType.Member)
    setIndex(value)
  }

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
