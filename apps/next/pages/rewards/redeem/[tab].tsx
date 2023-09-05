import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopRewardLayout } from 'components/layouts/desktop'
import { MobileRewardLayout } from 'components/layouts/mobile'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(import('app/features/rewards/RewardScreen'))
const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/rewards/RewardScreen')
)

const Reward: AdaptiveLayoutPage = withAdaptiveScreen(
  LazyMobileScreen,
  LazyDesktopScreen
)
Reward.DesktopLayout = DesktopRewardLayout
Reward.MobileLayout = MobileRewardLayout

export default Reward

export const getServerSideProps = () => {
  return { props: { withoutContainer: true } }
}
