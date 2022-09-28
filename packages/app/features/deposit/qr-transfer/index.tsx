import MenuNotice from 'app/components/common/MenuNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { DEPOSIT_NOTES } from 'app/constant/notes'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import AutoDepositForm from '../components/AutoDepositForm'

const QrTransferScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      header={{
        title: t('deposit.depositMethod.qrCode'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
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
