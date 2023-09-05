import CheckIn from 'app/features/rewards/CheckIn'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { MobileRewardLayout } from 'components/layouts/mobile'

const CheckInPage: AdaptiveLayoutPage = CheckIn

CheckInPage.MobileLayout = MobileRewardLayout

export default CheckInPage
