import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { useResponsiveValue } from 'dripsy'
import { Platform } from 'react-native'
import TopUpCardContent from './TopUpCardContent'

const TopUpCardScreen = () => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.topupCard') }}
    >
      <TopUpCardContent />
    </PageWithBackHeader>
  )
}

export default TopUpCardScreen
