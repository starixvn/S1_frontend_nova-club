import React from 'react'
import LoginPage from 'app/features/auth/login'
import { MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'
import Layout from '../../layouts/commonLayout'

const AnimatedLoginPage = () => {
  return (
    <Layout>
      <LoginPage />
    </Layout>
  )
}

export default LoginPage
