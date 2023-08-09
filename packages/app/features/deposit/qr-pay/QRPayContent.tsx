import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ScrollView, View } from 'dripsy'
import DepositForm from '../component/DepositForm'
import PendingTransaction from '../component/PendingTransaction'

const QRPayContent = () => {
  const horizontalMode = useIsDesktop()

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
