import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { EmptyLayout } from 'components/layouts/desktop'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(import('components/midAutumn/MidAutumnGame'), {
  ssr: false,
})

const MidAutumnGame: AdaptiveLayoutPage = LazyMobileScreen

MidAutumnGame.DesktopLayout = EmptyLayout
MidAutumnGame.MobileLayout = EmptyLayout

export default MidAutumnGame
