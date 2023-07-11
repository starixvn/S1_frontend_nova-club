import { LANGUAGE_CODE } from 'app/utils/constant'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopInfoLayout } from 'components/layouts/desktop'
import { MobileInfoLayout } from 'components/layouts/mobile'
import InfoScreen from 'app/features/info/InfoScreen'
import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'dripsy'

const LazyEn = dynamic(() => import('app/features/info/Tnc/TncEn'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const LazyVi = dynamic(() => import('app/features/info/tnc/TncVi'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const infoLocalizationMapping = {
  [LANGUAGE_CODE.ENGLISH]: LazyEn,
  [LANGUAGE_CODE.VIETNAM]: LazyVi,
}

const Tnc: AdaptiveLayoutPage = () => (
  <InfoScreen map={infoLocalizationMapping} />
)

Tnc.DesktopLayout = DesktopInfoLayout
Tnc.MobileLayout = MobileInfoLayout

export default Tnc
