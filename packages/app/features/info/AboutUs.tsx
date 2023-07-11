import { View, Text } from 'react-native'
import React from 'react'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import AboutUsDesktop from 'desktop-ext/features/info/about-us'

const AboutUs = () => {
  return (
    <PageWithBackHeader
      header={{ title: 'Aboutus' }}
      hideHeader={window.ReactNativeWebView ? true : false}
    >
      <AboutUsDesktop />
    </PageWithBackHeader>
  )
}

export default AboutUs
