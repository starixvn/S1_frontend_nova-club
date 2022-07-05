import { useResetRTKQ } from 'app/hooks/useResetRTKQ'
import React, { useEffect } from 'react'
import AuthLayout from '../layout/AuthLayout'
import LoginForm from './LoginForm'

const LoginPage = () => {
  useResetRTKQ()

  return (
    <AuthLayout showBackButton={false} headerDesc={'LOGIN TO YOUR ACCOUNT'}>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
