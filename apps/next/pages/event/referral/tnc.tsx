import { DesktopBaseLayout } from 'components/layouts/desktop'
import { MobileInfoLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/home/EventModal/tnc/referral'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('app/features/home/EventModal/tnc/referral'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const ReferralTnc = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

ReferralTnc.DesktopLayout = DesktopBaseLayout
ReferralTnc.MobileLayout = MobileInfoLayout

export default ReferralTnc
