import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/withdrawal/CryptoWithdrawalScreen'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/withdrawal/CryptoWithdrawalPage'),
  { ssr: false }
)

const CryptoWithdrawalScreen = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

CryptoWithdrawalScreen.DesktopLayout = DesktopWalletLayout

export default CryptoWithdrawalScreen
