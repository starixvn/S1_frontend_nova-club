import { LANGUAGE_CODE } from 'app/utils/constant'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import {
  DesktopBaseLayout,
  DesktopInfoLayout,
} from 'components/layouts/desktop'
import { MobileInfoLayout, MobileTabLayout } from 'components/layouts/mobile'
import InfoScreen from 'app/features/info/InfoScreen'
import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'dripsy'

const LazyEn = dynamic(() => import('app/features/lucky-spin/TncEn'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const LazyVi = dynamic(() => import('app/features/lucky-spin/TncVi'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const infoLocalizationMapping = {
  [LANGUAGE_CODE.ENGLISH]: LazyEn,
  [LANGUAGE_CODE.VIETNAM]: LazyVi,
}

const LuckySpinTnc: AdaptiveLayoutPage = () => (
  <InfoScreen map={infoLocalizationMapping} />
)

LuckySpinTnc.DesktopLayout = DesktopBaseLayout
LuckySpinTnc.MobileLayout = MobileInfoLayout

export default LuckySpinTnc
