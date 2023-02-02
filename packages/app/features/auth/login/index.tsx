import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const { t } = useLocalization()

  return (
    <AuthLayout
      headerDesc={t('auth.loginToAccount')}
      gradientColor={['#e9a717', '#ecb625', '#f5d646', '#fdf169']}
    >
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
