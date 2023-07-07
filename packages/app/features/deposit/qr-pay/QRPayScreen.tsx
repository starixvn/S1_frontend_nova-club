import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, useResponsiveValue } from 'dripsy'
import DepositForm from '../component/DepositForm'
import PendingTransaction from '../component/PendingTransaction'

const QRPayScreen = () => {
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  return (
    <ScrollView>
      <DepositForm DepositCategoryId={DepositPaymentMethodCategoryId.QR_CODE} />
      {horizontalMode && (
        <PendingTransaction
          paymentMethod={DepositPaymentMethodCategoryId.QR_CODE}
        />
      )}
    </ScrollView>
  )
}

export default QRPayScreen
