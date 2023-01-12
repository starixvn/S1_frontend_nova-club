import SlotMachine from 'app/features/events/cny/SlotMachine'
import useLocalization from 'app/provider/localization'
import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const { t } = useLocalization()

  return (
    // <SlotMachine />
    <AuthLayout showBackButton={false} headerDesc={t('auth.loginToAccount')}>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
