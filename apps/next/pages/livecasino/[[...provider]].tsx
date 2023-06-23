import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  import('app/features/livecasino/LiveCasinoScreen')
)
const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/livecasino/LiveCasinoScreen')
)

const LiveCasino = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

LiveCasino.MobileLayout = MobileTabLayout

export default LiveCasino
