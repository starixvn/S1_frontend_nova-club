import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Platform } from 'react-native'
import OnlineBankingContent from './OnlineBankingContent'

const OnlineBankingScreen = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.depositMethod.onlineBanking') }}
    >
      <OnlineBankingContent />
    </PageWithBackHeader>
  )
}

export default OnlineBankingScreen
