import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import AdaptivePageLoader from 'components/layouts/AdaptivePageLoader'
import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/home/HomeScreen'), {
  loading: AdaptivePageLoader,
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/home/HomeScreen'),
  { loading: AdaptivePageLoader, ssr: false }
)

const Home: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

Home.MobileLayout = MobileTabLayout

export default Home
