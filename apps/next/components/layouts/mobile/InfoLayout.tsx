import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Platform } from 'react-native'

export default function InfoLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter()
  const { t } = useLocalization()
  const currentPath = pathname.replace('/info/', '')

  const infoPageTitle = MapInfoRouteTitle(currentPath)
  return (
    <PageWithBackHeader
      header={{ title: t(infoPageTitle) }} // TODO find way to change title based on route
      hideHeader={window.ReactNativeWebView ? true : false}
      wrapperStyle={{ maxHeight: Platform.OS === 'web' ? '100vh' : '' }}
    >
      {children}
    </PageWithBackHeader>
  )
}

const MapInfoRouteTitle = (currentPath: string) => {
  switch (currentPath) {
    case 'tnc':
    case '/event/luckyspin/tnc':
    case '/event/christmas-gift/tnc':
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
