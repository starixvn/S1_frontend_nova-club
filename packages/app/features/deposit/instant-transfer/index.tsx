import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import useLocalization from 'app/provider/localization'
import { DEPOSIT_NOTES } from 'app/utils/constant'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import InstantTransferContent from './InstantTransferContent'

const InstantTransferPayScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{
        title: t('deposit.depositMethod.instantTransfer'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
      <InstantTransferContent />
    </PageWithBackHeader>
  )
}

export default InstantTransferPayScreen
