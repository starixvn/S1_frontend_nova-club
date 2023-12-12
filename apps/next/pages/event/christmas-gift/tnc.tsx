import InfoScreen from 'app/features/info/InfoScreen'
import { LANGUAGE_CODE } from 'utils/constant'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopBaseLayout } from 'components/layouts/desktop'
import { MobileInfoLayout } from 'components/layouts/mobile'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyEn = dynamic(
  () => import('app/features/home/EventModal/tnc/christmasGift'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const LazyVi = dynamic(
  () => import('app/features/home/EventModal/tnc/christmasGift'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const infoLocalizationMapping = {
  [LANGUAGE_CODE.ENGLISH]: LazyEn,
  [LANGUAGE_CODE.VIETNAM]: LazyVi,
}

const ChristmasGiftTnc: AdaptiveLayoutPage = () => (
  <InfoScreen map={infoLocalizationMapping} />
)

ChristmasGiftTnc.DesktopLayout = DesktopBaseLayout
ChristmasGiftTnc.MobileLayout = MobileInfoLayout

export default ChristmasGiftTnc
