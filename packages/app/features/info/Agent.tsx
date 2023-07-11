import React from 'react'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import AgentDesktop from 'desktop-ext/features/info/agent'

const Agent = () => {
  return (
    <PageWithBackHeader
      header={{ title: 'Aboutus' }}
      hideHeader={window.ReactNativeWebView ? true : false}
    >
      <AgentDesktop />
    </PageWithBackHeader>
  )
}

export default Agent
