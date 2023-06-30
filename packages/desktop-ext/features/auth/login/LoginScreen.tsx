import LoginForm from 'app/features/auth/login/LoginForm'
import React from 'react'
import AuthLayout from '../AuthLayout'

type Props = {}

export default function LoginScreen({}: Props) {
  return (
    <AuthLayout headerDesc={'Agent Login'}>
      <LoginForm isAgent={true} />
    </AuthLayout>
  )
}
