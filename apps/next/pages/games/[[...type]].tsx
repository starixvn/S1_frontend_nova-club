import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(import('app/features/games/GamesScreen'))
const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/games/GamesScreen')
)

const Games = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Games.MobileLayout = MobileTabLayout

export default Games
