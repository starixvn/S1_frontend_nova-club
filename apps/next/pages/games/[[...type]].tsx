import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(import('app/features/games/GamesScreen'))
const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/games/GamesScreen')
)

const Games: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

Games.MobileLayout = MobileTabLayout

export default Games
