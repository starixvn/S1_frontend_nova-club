import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'
import MenuNotice from 'app/components/common/MenuNotice'
import { DEPOSIT_NOTES } from 'app/constant/notes'
import { useModal } from 'react-native-modalfy'

const OnlineBankScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      header={{
        title: t('deposit.depositMethod.onlineBanking'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          module="deposit"
          DepositCategoryId={DepositPaymentMethodCategoryId.ONLINE_BANK}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default OnlineBankScreen
