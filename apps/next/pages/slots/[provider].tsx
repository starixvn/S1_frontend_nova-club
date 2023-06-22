import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(import('app/features/slot/SlotScreen'))
const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/slot/SlotScreen')
)

const Slot = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Slot.MobileLayout = MobileTabLayout

export default Slot
