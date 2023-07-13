import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Platform } from 'react-native'
import MomoContent from './MomoContent'

const MomoPayScreen = () => {
  const { t } = useLocalization()
  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.depositMethod.momo') }}
    >
      <MomoContent />
    </PageWithBackHeader>
  )
}

export default MomoPayScreen
