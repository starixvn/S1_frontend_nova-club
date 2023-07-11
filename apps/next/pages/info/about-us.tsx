import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopInfoLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/info/AboutUs'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/info/about-us/index'),
  {
    ssr: false,
  }
)

const AboutUs: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

AboutUs.DesktopLayout = DesktopInfoLayout

export default AboutUs
