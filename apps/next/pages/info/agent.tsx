import { DesktopCommonInfoLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/info/Agent'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/info/agent/index'),
  {
    ssr: false,
  }
)

const Agent = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Agent.DesktopLayout = DesktopCommonInfoLayout

export default Agent
