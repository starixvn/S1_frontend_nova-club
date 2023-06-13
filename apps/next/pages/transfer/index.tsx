import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/transfer'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/transfer/TransferScreen'),
  { ssr: false }
)

const Transfer = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Transfer.DesktopLayout = DesktopWalletLayout

export default Transfer
