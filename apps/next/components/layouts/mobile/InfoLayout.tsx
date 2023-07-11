import { PageWithBackHeader } from 'app/components/layouts/Page'
import { ReactNode } from 'react'

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <PageWithBackHeader
      header={{ title: 'Aboutus' }} // TODO find way to change title based on route
      hideHeader={window.ReactNativeWebView ? true : false}
    >
      {children}
    </PageWithBackHeader>
  )
}
