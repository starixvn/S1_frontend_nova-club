import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/deposit/index'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/DepositScreen'),
  { ssr: false }
)

const Deposit = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Deposit.DesktopLayout = DesktopWalletLayout

export default Deposit
