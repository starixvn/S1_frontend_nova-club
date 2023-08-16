import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopAccountLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/account'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('app/features/account/profile-details/ProfileDetails'),
  {
    ssr: false,
  }
)

const Account: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

Account.DesktopLayout = DesktopAccountLayout

export default Account
