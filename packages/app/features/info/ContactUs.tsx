import React from 'react'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import ContactUsDesktop from 'desktop-ext/features/info/contact-us'

const ContactUs = () => {
  return (
    <PageWithBackHeader
      header={{ title: 'ContactUs' }}
      hideHeader={window.ReactNativeWebView ? true : false}
    >
      <ContactUsDesktop />
    </PageWithBackHeader>
  )
}

export default ContactUs
