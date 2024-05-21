import OnlineBankingScreen from 'app/features/deposit/online-banking'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopDepositLayout, DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'
import DepositGuard from './deposit-guard'

const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/qr-pay/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/QrPayPage'),
  { ssr: false }
)

const QRPayScreen: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)
const GuardQRPayScreen: AdaptiveLayoutPage = DepositGuard(
  QRPayScreen,
  'deposit'
)
GuardQRPayScreen.DesktopLayout = DesktopDepositLayout

export default GuardQRPayScreen
