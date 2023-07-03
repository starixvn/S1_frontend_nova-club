import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileDepositScreen = dynamic(
  () => import('app/features/deposit/crypto/index'),
  {
    ssr: false,
  }
)

const LazyDesktopDepositScreen = dynamic(
  () => import('desktop-ext/features/deposit/CryptoPayPage'),
  { ssr: false }
)

const CryptoPayScreen = withAdaptiveScreen(
  LazyMobileDepositScreen,
  LazyDesktopDepositScreen
)

CryptoPayScreen.DesktopLayout = DesktopWalletLayout

export default CryptoPayScreen
