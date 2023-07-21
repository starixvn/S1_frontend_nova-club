import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'
import DepositGuard from './deposit-guard'

const LazyMobileScreen = dynamic(() => import('app/features/deposit/index'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/deposit/DepositScreen'),
  { ssr: false }
)

const Deposit: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

const GuardedDeposit: AdaptiveLayoutPage = DepositGuard(Deposit, 'deposit')
GuardedDeposit.DesktopLayout = DesktopWalletLayout

export default GuardedDeposit

//https://www.digitalocean.com/community/tutorials/copying-objects-in-javascript
