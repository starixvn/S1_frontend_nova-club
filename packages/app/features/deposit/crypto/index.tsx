import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Platform } from 'react-native'
import CryptoPayContent from './CryptoPayContent'

const CryptoPayScreen = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.crypto') }}
    >
      <CryptoPayContent />
    </PageWithBackHeader>
  )
}

export default CryptoPayScreen
