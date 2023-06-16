import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/topup-card/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/DepositScreen'),
  { ssr: false }
)

const TopUpCardScreen = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

TopUpCardScreen.DesktopLayout = DesktopWalletLayout

export default TopUpCardScreen
