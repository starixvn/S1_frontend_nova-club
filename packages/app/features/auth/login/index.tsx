import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useMemo } from 'react'
import { createParam } from 'solito'
import AuthLayout from '../layout/AuthLayout'
import { LoginType } from '../type'
import LoginForm from './LoginForm'
import LoginSelection from './LoginSelection'
import WelcomeSection from './WelcomeSection'

const { useParam } = createParam<{ t: LoginType }>()
const LoginPage = () => {
  const { t } = useLocalization()
  const [type, setIsAgentLogin] = useParam('t', { initial: LoginType.Member })

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])

  return (
    <AuthLayout
      isAgent={isAgentLogin}
      headerDesc={t('auth.loginToAccount')}
      gradientColor={['#e9a717', '#ecb625', '#f5d646', '#fdf169']}
    >
      <WelcomeSection />
      <LoginSelection isAgent={isAgentLogin} setType={setIsAgentLogin} />

      <View sx={{ alignItems: 'center', pt: '$8', flex: 1 }}>
        <View sx={{ width: '75%', flex: 1 }}>
          <LoginForm isAgent={isAgentLogin} />
        </View>
      </View>
    </AuthLayout>
  )
}

export default LoginPage
