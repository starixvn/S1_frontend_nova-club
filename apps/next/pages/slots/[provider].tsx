import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { LazyDesktopSlotScreen, LazyMobileSlotScreen } from 'pages/slots'

const Slot = withAdaptiveScreen(LazyMobileSlotScreen, LazyDesktopSlotScreen)

Slot.MobileLayout = MobileTabLayout

export default Slot
