import { DesktopBaseLayout } from 'components/layouts/desktop'
import { MobileInfoLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/home/EventModal/tnc/register'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('app/features/home/EventModal/tnc/register'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const RegisterEventTnc = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

RegisterEventTnc.DesktopLayout = DesktopBaseLayout
RegisterEventTnc.MobileLayout = MobileInfoLayout

export default RegisterEventTnc
