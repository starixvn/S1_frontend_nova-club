import { DesktopLeaderboardLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  () => import('app/features/leaderboard/index'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  () => import('app/features/leaderboard/index'),
  { ssr: false }
)

const LeaderboardScreen = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

LeaderboardScreen.DesktopLayout = DesktopLeaderboardLayout
export default LeaderboardScreen
