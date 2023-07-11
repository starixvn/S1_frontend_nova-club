import { DesktopCommonInfoLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/info/Tnc'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/info/tnc/index'),
  {
    ssr: false,
  }
)

const Tnc = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Tnc.DesktopLayout = DesktopCommonInfoLayout

export default Tnc
