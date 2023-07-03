import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/deposit/momo/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/MomoPayPage'),
  { ssr: false }
)

const MomoPayScreen = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

MomoPayScreen.DesktopLayout = DesktopWalletLayout

export default MomoPayScreen
