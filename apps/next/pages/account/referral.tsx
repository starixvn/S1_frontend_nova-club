import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopAccountLayout } from 'components/layouts/desktop'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

export const LazyScreen = dynamic(
  () => import('app/features/account/ReferralScreen'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)
const ReferralScreen: AdaptiveLayoutPage = LazyScreen

ReferralScreen.DesktopLayout = DesktopAccountLayout

export default ReferralScreen
