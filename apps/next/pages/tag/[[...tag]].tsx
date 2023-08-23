import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(import('app/features/tag/TagScreen'))
const LazyDesktopScreen = dynamic(import('app/features/tag/TagScreen'))

const Slot: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

Slot.MobileLayout = MobileTabLayout

export default Slot
