import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopAccountLayout } from 'components/layouts/desktop'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

export const LazyScreen = dynamic(
  () => import('app/features/account/biometric'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const BiometricScreen: AdaptiveLayoutPage = LazyScreen

BiometricScreen.DesktopLayout = DesktopAccountLayout

export default BiometricScreen
