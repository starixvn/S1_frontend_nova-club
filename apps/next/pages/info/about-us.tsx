import { LANGUAGE_CODE } from 'utils/constant'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopInfoLayout } from 'components/layouts/desktop'
import { MobileInfoLayout } from 'components/layouts/mobile'
import InfoScreen from 'app/features/info/InfoScreen'
import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'dripsy'

const LazyEn = dynamic(() => import('app/features/info/aboutUs/AboutUsEn'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const LazyVi = dynamic(() => import('app/features/info/aboutUs/AboutUsVi'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const infoLocalizationMapping = {
  [LANGUAGE_CODE.ENGLISH]: LazyEn,
  [LANGUAGE_CODE.VIETNAM]: LazyVi,
}

const AboutUs: AdaptiveLayoutPage = () => (
  <InfoScreen map={infoLocalizationMapping} />
)

AboutUs.DesktopLayout = DesktopInfoLayout
AboutUs.MobileLayout = MobileInfoLayout

export default AboutUs
