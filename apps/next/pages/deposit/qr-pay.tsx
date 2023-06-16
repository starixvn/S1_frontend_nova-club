import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/qr-pay/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/DepositScreen'),
  { ssr: false }
)

const QRPayScreen = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

QRPayScreen.DesktopLayout = DesktopWalletLayout

export default QRPayScreen
