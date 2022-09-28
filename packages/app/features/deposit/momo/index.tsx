import MenuNotice from 'app/components/common/MenuNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { DEPOSIT_NOTES } from 'app/constant/notes'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import AutoDepositForm from '../components/AutoDepositForm'

const MomoScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      header={{
        title: t('deposit.depositMethod.momo'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          module="momo"
          DepositCategoryId={DepositPaymentMethodCategoryId.MOMO}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default MomoScreen
