import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, useResponsiveValue } from 'dripsy'
import DepositForm from '../component/DepositForm'
import PendingTransaction from '../component/PendingTransaction'

const CryptoPayContent = () => {
  const horizontalMode = useResponsiveValue([false, false, false, true, true])
  return (
    <ScrollView>
      <DepositForm DepositCategoryId={DepositPaymentMethodCategoryId.CRYPTO} />
      {horizontalMode && (
        <PendingTransaction
          paymentMethod={DepositPaymentMethodCategoryId.CRYPTO}
        />
      )}
    </ScrollView>
  )
}

export default CryptoPayContent
