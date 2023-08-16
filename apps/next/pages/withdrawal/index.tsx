import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/withdrawal'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/withdrawal/WithdrawalScreen'),
  { ssr: false }
)

const WithdrawalScreen = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

WithdrawalScreen.DesktopLayout = DesktopWalletLayout
export default WithdrawalScreen
