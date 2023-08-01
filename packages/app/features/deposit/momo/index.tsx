import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import useLocalization from 'app/provider/localization'
import { DEPOSIT_NOTES } from 'app/utils/constant'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import MomoContent from './MomoContent'

const MomoPayScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{
        title: t('deposit.depositMethod.momo'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
      <MomoContent />
    </PageWithBackHeader>
  )
}

export default MomoPayScreen
