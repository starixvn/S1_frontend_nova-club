import { PageWithBackHeader } from 'app/components/layouts/Page'
import TncDesktop from 'desktop-ext/features/info/tnc'

import React from 'react'

const Tnc = () => {
  return (
    <PageWithBackHeader
      header={{ title: 'Aboutus' }}
      hideHeader={window.ReactNativeWebView ? true : false}
    >
      <TncDesktop />
    </PageWithBackHeader>
  )
}

export default Tnc
