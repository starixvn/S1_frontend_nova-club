import InfoScreen from 'app/features/info/InfoScreen'
import { LANGUAGE_CODE } from 'utils/constant'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopBaseLayout } from 'components/layouts/desktop'
import {
  MobileInfoLayout,
  MobileRewardLayout,
  MobileTabLayout,
} from 'components/layouts/mobile'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'

const LazyMobileScreen = dynamic(
  () => import('app/features/rewards/tnc/MysteryDropTnc'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const MysteryDropTnc = withAdaptiveScreen(LazyMobileScreen, LazyMobileScreen)

MysteryDropTnc.DesktopLayout = DesktopBaseLayout

export default MysteryDropTnc
