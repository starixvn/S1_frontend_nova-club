import { useResetRTKQ } from 'app/hooks/useResetRTKQ'
import useLocalization from 'app/provider/localization'
import React, { useEffect } from 'react'
import AuthLayout from '../layout/AuthLayout'
import LoginForm from './LoginForm'

const LoginPage = () => {
  useResetRTKQ()
  const { t } = useLocalization()

  return (
    <AuthLayout showBackButton={false} headerDesc={t('auth.loginToAccount')}>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
