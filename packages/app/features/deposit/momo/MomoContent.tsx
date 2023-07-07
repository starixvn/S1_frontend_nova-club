import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, useResponsiveValue } from 'dripsy'
import DepositForm from '../component/DepositForm'
import PendingTransaction from '../component/PendingTransaction'
const MomoContent = () => {
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  return (
    <ScrollView>
      <DepositForm DepositCategoryId={DepositPaymentMethodCategoryId.MOMO} />
      {horizontalMode && (
        <PendingTransaction
          paymentMethod={DepositPaymentMethodCategoryId.MOMO}
        />
      )}
    </ScrollView>
  )
}

export default MomoContent
