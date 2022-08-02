import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'

const MomoScreen = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader header={{ title: t('deposit.depositMethod.momo') }}>
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
