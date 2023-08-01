import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, View, useResponsiveValue } from 'dripsy'
import DepositForm from '../component/DepositForm'
import PendingTransaction from '../component/PendingTransaction'

const QRPayContent = () => {
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  return (
    <ScrollView contentContainerSx={{ alignItems: 'center' }}>
      <View sx={{ width: horizontalMode ? '70%' : '100%' }}>
        <DepositForm
          DepositCategoryId={DepositPaymentMethodCategoryId.QR_CODE}
        />
      </View>
      {horizontalMode && (
        <PendingTransaction
          paymentMethod={DepositPaymentMethodCategoryId.QR_CODE}
        />
      )}
    </ScrollView>
  )
}

export default QRPayContent
