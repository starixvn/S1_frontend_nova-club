import { LoginType } from 'app/features/auth/AuthTypeSelection'
import LoginForm from 'app/features/auth/login/LoginForm'
import useLocalization from 'app/provider/localization'
import React, { useMemo } from 'react'
import { createParam } from 'solito'
import AuthLayout from '../AuthLayout'

type Props = {}

const { useParam } = createParam<{ t: LoginType }>()

export default function LoginScreenDesktop({}: Props) {
  const { t } = useLocalization()
  const [type, setType] = useParam('t', { initial: LoginType.Member })

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])

  return (
    <AuthLayout headerDesc={t('authentication.loginHeader')}>
      <LoginForm isAgent={true} />
    </AuthLayout>
  )
}
