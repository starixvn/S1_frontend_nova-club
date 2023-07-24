import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'
import DepositGuard from './deposit-guard'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'

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

const CryptoPayScreen: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileDepositScreen,
  LazyDesktopDepositScreen
)

const GuardCryptoPay: AdaptiveLayoutPage = DepositGuard(
  CryptoPayScreen,
  'deposit'
)
GuardCryptoPay.DesktopLayout = DesktopWalletLayout

export default GuardCryptoPay
