import MomoPayScreen from 'app/features/deposit/momo'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopDepositLayout, DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'
import DepositGuard from './deposit-guard'

const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/online-banking/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/OnlineBankingPage'),
  { ssr: false }
)

const OnlineBankingScreen: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

const GuardOnlineBankingScreen: AdaptiveLayoutPage = DepositGuard(
  OnlineBankingScreen,
  'deposit'
)
GuardOnlineBankingScreen.DesktopLayout = DesktopDepositLayout

export default GuardOnlineBankingScreen
