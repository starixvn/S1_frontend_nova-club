import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Platform } from 'react-native'
import BankTransferContent from './BankTransferContent'
import MenuNotice from 'app/components/navigation/MenuNotice'
import { DEPOSIT_NOTES } from 'app/utils/constant'
import { useModal } from 'react-native-modalfy'

const BankTransferScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{
        title: t('deposit.depositMethod.bankTransfer'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
      <BankTransferContent />
    </PageWithBackHeader>
  )
}

export default BankTransferScreen
