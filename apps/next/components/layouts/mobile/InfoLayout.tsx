import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export default function InfoLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter()
  const { t } = useLocalization()
  const currentPath = pathname.replace('/info/', '')

  const infoPageTitle = MapInfoRouteTitle(currentPath)
  console.log('.', infoPageTitle)
  return (
    <PageWithBackHeader
      header={{ title: t(infoPageTitle) }} // TODO find way to change title based on route
      hideHeader={window.ReactNativeWebView ? true : false}
    >
      {children}
    </PageWithBackHeader>
  )
}

const MapInfoRouteTitle = (currentPath: string) => {
  switch (currentPath) {
    case 'tnc':
      return 'common.tnc'
    case 'about-us':
      return 'footer.aboutUs'
    // case 'contact-us':
    //   return 'footer.contactUs'
    case 'shareholder':
      return 'common.shareholder'
    case 'agent':
      return 'common.agent'
    default:
      return 'VUI123'
  }
}
