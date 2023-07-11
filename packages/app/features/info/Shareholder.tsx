import { PageWithBackHeader } from 'app/components/layouts/Page'
import ShareholderDesktop from 'desktop-ext/features/info/shareholder'
import React from 'react'

const Shareholder = () => {
  return (
    <PageWithBackHeader
      header={{ title: 'Aboutus' }}
      hideHeader={window.ReactNativeWebView ? true : false}
    >
      <ShareholderDesktop />
    </PageWithBackHeader>
  )
}

export default Shareholder
