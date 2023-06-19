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

const Home = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

export default Home
// eslint-disable-next-line react/display-name
Home.MobileLayout = MobileTabLayout
