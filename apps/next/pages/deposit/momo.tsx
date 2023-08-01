import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'
import DepositGuard from './deposit-guard'

const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/momo/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/MomoPayPage'),
  { ssr: false }
)

const MomoPayScreen: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

const GuardMomoScreen: AdaptiveLayoutPage = DepositGuard(
  MomoPayScreen,
  'deposit'
)
GuardMomoScreen.DesktopLayout = DesktopWalletLayout

export default GuardMomoScreen
