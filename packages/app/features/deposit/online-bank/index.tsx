import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'

const OnlineBankScreen = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader
      header={{ title: t('deposit.depositMethod.onlineBanking') }}
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
