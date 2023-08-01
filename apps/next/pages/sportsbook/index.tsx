import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { MobileTabLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  import('app/features/sportsbook/SportsbookScreen'),
  {
    ssr: false,
  }
)

const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/sportsbook/SportsbookScreen'),
  {
    ssr: false,
  }
)

const Sportsbook: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)

Sportsbook.MobileLayout = MobileTabLayout

export default Sportsbook
