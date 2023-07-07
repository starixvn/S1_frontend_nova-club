import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, useResponsiveValue } from 'dripsy'
import PendingTransaction from '../component/PendingTransaction'
import BankTransferForm from './BankTransferForm'

const BankTransferContent = () => {
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  return (
    <ScrollView>
      <BankTransferForm />
      <PendingTransaction
        paymentMethod={DepositPaymentMethodCategoryId.LOCAL_BANK}
      />
    </ScrollView>
  )
}

export default BankTransferContent
