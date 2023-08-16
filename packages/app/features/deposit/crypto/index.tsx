import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Platform } from 'react-native'
import CryptoPayContent from './CryptoPayContent'
import MenuNotice from 'app/components/navigation/MenuNotice'
import { DEPOSIT_NOTES } from 'app/utils/constant'
import { useModal } from 'react-native-modalfy'

const CryptoPayScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{
        title: t('deposit.depositMethod.crypto'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
      <CryptoPayContent />
    </PageWithBackHeader>
  )
}

export default CryptoPayScreen
