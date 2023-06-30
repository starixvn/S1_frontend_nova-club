import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

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

const OnlineBankingScreen = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

OnlineBankingScreen.DesktopLayout = DesktopWalletLayout

export default OnlineBankingScreen
