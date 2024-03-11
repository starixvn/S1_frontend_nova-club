import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/event/retargeting'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)
const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/event/retargeting'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const Retention4Event = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

export default Retention4Event
