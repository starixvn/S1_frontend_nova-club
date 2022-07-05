import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'

const NOTES = ['note.qr1', 'note.qr2', 'note.qr3', 'note.qr4']

const QrTransferScreen = () => {
  const { t } = useLocalization()
  return (
    <PageWithBackHeader header={{ title: t('deposit.depositMethod.qrCode') }}>
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          notes={NOTES}
          module="qrTransfer"
          DepositCategoryId={DepositPaymentMethodCategoryId.QR_CODE}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default withContextualNav(
  QrTransferScreen,
  ContextualModuleKey.DepositQr
)
