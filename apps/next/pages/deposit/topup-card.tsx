import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopDepositLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'
import DepositGuard from './deposit-guard'
const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/topup-card/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/TopUpCardPage'),
  { ssr: false }
)

const TopUpCardScreen: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

const GuardTopUpCardScreen: AdaptiveLayoutPage = DepositGuard(
  TopUpCardScreen,
  'deposit'
)
GuardTopUpCardScreen.DesktopLayout = DesktopDepositLayout

export default GuardTopUpCardScreen
