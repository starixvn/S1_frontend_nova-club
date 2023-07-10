import { DesktopCommonInfoLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/info/Shareholder'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/info/shareholder/index'),
  {
    ssr: false,
  }
)

const ShareHolder = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

ShareHolder.DesktopLayout = DesktopCommonInfoLayout

export default ShareHolder
