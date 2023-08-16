import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/withdrawal/BankWithdrawalScreen'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/withdrawal/BankWithdrawalPage'),
  { ssr: false }
)

const BankWithdrawalScreen: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

BankWithdrawalScreen.DesktopLayout = DesktopWalletLayout

export default BankWithdrawalScreen
