import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { EmptyLayout } from 'components/layouts/desktop'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(import('components/plinko-event/PlinkoGame'), {
  ssr: false,
})

const PlinkoGame: AdaptiveLayoutPage = LazyMobileScreen

PlinkoGame.DesktopLayout = EmptyLayout
PlinkoGame.MobileLayout = EmptyLayout

export default PlinkoGame
