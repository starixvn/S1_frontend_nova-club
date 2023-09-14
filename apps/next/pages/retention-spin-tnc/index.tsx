import InfoScreen from 'app/features/info/InfoScreen'
import { LANGUAGE_CODE } from 'app/utils/constant'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopBaseLayout } from 'components/layouts/desktop'
import { MobileInfoLayout } from 'components/layouts/mobile'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const LazyEn = dynamic(() => import('app/features/retention-spin/tncEn'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const LazyVi = dynamic(() => import('app/features/retention-spin/tncVi'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const infoLocalizationMapping = {
  [LANGUAGE_CODE.ENGLISH]: LazyEn,
  [LANGUAGE_CODE.VIETNAM]: LazyVi,
}

const RetentionSpinTnc: AdaptiveLayoutPage = () => (
  <InfoScreen map={infoLocalizationMapping} />
)

RetentionSpinTnc.DesktopLayout = DesktopBaseLayout
RetentionSpinTnc.MobileLayout = MobileInfoLayout

export default RetentionSpinTnc
