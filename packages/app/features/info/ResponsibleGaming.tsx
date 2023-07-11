import { PageWithBackHeader } from 'app/components/layouts/Page'
import ResponsibleGamingDesktop from 'desktop-ext/features/info/responsible-gaming'
import React from 'react'

const ResponsibleGaming = () => {
  return (
    <PageWithBackHeader
      header={{ title: 'ResponsibleGaming' }}
      hideHeader={window.ReactNativeWebView ? true : false}
    >
      <ResponsibleGamingDesktop />
    </PageWithBackHeader>
  )
}

export default ResponsibleGaming
