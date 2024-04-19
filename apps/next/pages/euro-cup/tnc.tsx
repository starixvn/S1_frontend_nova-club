import { DesktopEuroTabLayout } from 'components/layouts/desktop'
import { MobileEuroTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/event/euroCup/Tnc'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)
const LazyDesktopScreen = dynamic(
  () => import('app/features/event/euroCup/Tnc'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const Tnc = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Tnc.MobileLayout = MobileEuroTabLayout
Tnc.DesktopLayout = DesktopEuroTabLayout

export default Tnc
