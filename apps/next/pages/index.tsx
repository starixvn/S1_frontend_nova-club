import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

// import Home from "desktop-ext/features/home/HomeScreen"

const LazyMobileScreen = dynamic(() => import('app/features/home/HomeScreen'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/home/HomeScreen'),
  { ssr: false }
)

const Home: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

Home.MobileLayout = MobileTabLayout
export default Home
