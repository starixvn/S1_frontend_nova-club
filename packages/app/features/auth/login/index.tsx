import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <AuthLayout showBackButton={false} headerDesc={'LOGIN TO YOUR ACCOUNT'}>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
