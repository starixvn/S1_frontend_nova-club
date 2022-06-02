import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Text, View } from 'dripsy'
import React from 'react'
import { TextLink } from 'solito/link'
import AuthLayout from '../layout/AuthLayout'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <AuthLayout showBackButton={false}>
      <LoginForm />

      <View sx={{ mt: '$12' }}>
        <TextLink href={'/home'}>
          <Text sx={{ textAlign: 'center' }}>Continue as guest</Text>
        </TextLink>
      </View>
    </AuthLayout>
  )
}

export default LoginPage
