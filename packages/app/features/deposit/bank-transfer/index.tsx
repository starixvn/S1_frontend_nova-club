import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Platform } from 'react-native'
import BankTransferContent from './BankTransferContent'

const BankTransferScreen = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.depositMethod.bankTransfer') }}
    >
      <BankTransferContent />
    </PageWithBackHeader>
  )
}

export default BankTransferScreen
