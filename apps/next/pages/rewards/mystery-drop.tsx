import { DesktopBaseLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/event/mysteryDrop/MysteryDropEvent'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)
const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/event/MysteryDrops'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const MysteryDropEvent = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

MysteryDropEvent.DesktopLayout = DesktopBaseLayout

export default MysteryDropEvent
