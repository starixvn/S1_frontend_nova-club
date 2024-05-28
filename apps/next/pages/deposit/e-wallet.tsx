import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import {
  DesktopDepositLayout
} from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'
import DepositGuard from './deposit-guard'

const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/e-wallet'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/EWalletPage'),
  { ssr: false }
)

const Screen: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

const GuardedScreen: AdaptiveLayoutPage = DepositGuard(Screen, 'deposit')
GuardedScreen.DesktopLayout = DesktopDepositLayout

export default GuardedScreen
