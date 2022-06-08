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
// @ts-expect-error: To be fix
AnimatedLoginPage.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default AnimatedLoginPage
