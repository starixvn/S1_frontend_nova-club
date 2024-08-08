import { DesktopDepositLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileDepositScreen = dynamic(
  () => import('app/features/deposit/deposit-loader/index'),
  {
    ssr: false,
  }
)

const LazyDesktopDepositScreen = dynamic(
  () => import('desktop-ext/features/deposit/DepositLoaderPage'),
  { ssr: false }
)

const DepositLoaderScreen = withAdaptiveScreen(
  LazyMobileDepositScreen,
  LazyDesktopDepositScreen
)

DepositLoaderScreen.DesktopLayout = DesktopDepositLayout

export default DepositLoaderScreen
