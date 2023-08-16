import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'
import DepositGuard from './deposit-guard'

const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/bank-transfer/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/BankTransferPage'),
  { ssr: false }
)

const BankTranferScreen: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)
const GuardBankTranferScreen: AdaptiveLayoutPage = DepositGuard(
  BankTranferScreen,
  'deposit'
)
GuardBankTranferScreen.DesktopLayout = DesktopWalletLayout

export default GuardBankTranferScreen
