import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'

const QrTransferScreen = () => {
  const { t } = useLocalization()
  return (
    <PageWithBackHeader header={{ title: t('deposit.depositMethod.qrCode') }}>
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          module="qrTransfer"
          DepositCategoryId={DepositPaymentMethodCategoryId.QR_CODE}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default QrTransferScreen
