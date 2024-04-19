import { DesktopEuroTabLayout } from 'components/layouts/desktop'
import { MobileEuroTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/event/euroCup/Prediction'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)
const LazyDesktopScreen = dynamic(
  () => import('app/features/event/euroCup/Prediction'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const Prediction = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Prediction.MobileLayout = MobileEuroTabLayout
Prediction.DesktopLayout = DesktopEuroTabLayout

export default Prediction
