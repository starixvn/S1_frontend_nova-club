import { DesktopBaseLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/event/euroCup/Winner'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)
const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/event/euro-cup/Winner'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const Winner = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

// Winner.MobileLayout = MobileEuroTabLayout
// Winner.DesktopLayout = DesktopBaseLayout

export default Winner
