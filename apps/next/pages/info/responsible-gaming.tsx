import { LANGUAGE_CODE } from 'app/utils/constant'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopInfoLayout } from 'components/layouts/desktop'
import { MobileInfoLayout } from 'components/layouts/mobile'
import InfoScreen from 'app/features/info/InfoScreen'
import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'dripsy'

const LazyEn = dynamic(
  () => import('app/features/info/responsibleGaming/ResponsibleGamingEn'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const LazyVi = dynamic(
  () => import('app/features/info/responsibleGaming/ResponsibleGamingVi'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const infoLocalizationMapping = {
  [LANGUAGE_CODE.ENGLISH]: LazyEn,
  [LANGUAGE_CODE.VIETNAM]: LazyVi,
}

const ResponsibleGaming: AdaptiveLayoutPage = () => (
  <InfoScreen map={infoLocalizationMapping} />
)

ResponsibleGaming.DesktopLayout = DesktopInfoLayout
ResponsibleGaming.MobileLayout = MobileInfoLayout

export default ResponsibleGaming
