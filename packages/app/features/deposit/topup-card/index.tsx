import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import useLocalization from 'app/provider/localization'
import { TOPUP_NOTES } from 'app/utils/constant'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import TopUpCardContent from './TopUpCardContent'

const TopUpCardScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{
        title: t('deposit.depositMethod.topUp'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: TOPUP_NOTES })}
          />
        ),
      }}
    >
      <TopUpCardContent />
    </PageWithBackHeader>
  )
}

export default TopUpCardScreen
