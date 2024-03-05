import { DesktopBaseLayout } from 'components/layouts/desktop'
import { MobileInfoLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/home/EventModal/tnc/retention3'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('app/features/home/EventModal/tnc/retention3'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const RetentionSpinTnc = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

RetentionSpinTnc.DesktopLayout = DesktopBaseLayout
RetentionSpinTnc.MobileLayout = MobileInfoLayout

export default RetentionSpinTnc
