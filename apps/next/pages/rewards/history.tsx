import HistoryScreen from 'app/features/rewards/HistoryScreen'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopRewardLayout } from 'components/layouts/desktop'
import { MobileRewardLayout } from 'components/layouts/mobile'

const HistoryPage: AdaptiveLayoutPage = HistoryScreen

HistoryPage.DesktopLayout = DesktopRewardLayout
HistoryPage.MobileLayout = MobileRewardLayout

export default HistoryPage
