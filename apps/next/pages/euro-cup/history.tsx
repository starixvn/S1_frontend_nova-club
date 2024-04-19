import { DesktopEuroTabLayout } from 'components/layouts/desktop'
import { MobileEuroTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/event/euroCup/History'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)
const LazyDesktopScreen = dynamic(
  () => import('app/features/event/euroCup/History'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const History = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

History.MobileLayout = MobileEuroTabLayout
History.DesktopLayout = DesktopEuroTabLayout

export default History
