import { DesktopCommonInfoLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/info/ResponsibleGaming'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/info/responsible-gaming/index'),
  {
    ssr: false,
  }
)

const ResponsibleGaming = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

ResponsibleGaming.DesktopLayout = DesktopCommonInfoLayout

export default ResponsibleGaming
