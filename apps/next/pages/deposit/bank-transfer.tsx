import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileDepositScreen = dynamic(
  () => import('app/features/deposit/bank-transfer/index'),
  {
    ssr: false,
  }
)

const LazyDesktopDepositScreen = dynamic(
  () => import('desktop-ext/features/deposit/DepositScreen'),
  { ssr: false }
)

const Deposit = withAdaptiveScreen(
  LazyMobileDepositScreen,
  LazyDesktopDepositScreen
)

Deposit.DesktopLayout = DesktopWalletLayout

export default Deposit
