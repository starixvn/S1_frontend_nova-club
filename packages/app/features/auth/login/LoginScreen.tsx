import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import AuthLayout from '../AuthLayout'
import AuthTypeSelection, { LoginType } from '../AuthTypeSelection'
import { createParam } from 'solito'
import LoginForm from './LoginForm'

const { useParam } = createParam<{ t: LoginType }>()

export default function LoginScreen() {
  const [type, setIsAgentLogin] = useParam('t', { initial: LoginType.Member })

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])
  return (
    <AuthLayout headerDesc={'login to your account'} headerColor={'black'}>
      <AuthTypeSelection isAgent={isAgentLogin} setType={setIsAgentLogin} />

      <LoginForm />
    </AuthLayout>
  )
}
