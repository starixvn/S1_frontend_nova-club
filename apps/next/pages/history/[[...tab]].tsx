import { DesktopWalletLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/account/history'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('app/features/account/history'),
  { ssr: false }
)

const History = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

History.DesktopLayout = DesktopWalletLayout
export default History
