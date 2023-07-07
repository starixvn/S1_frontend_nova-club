import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView } from 'dripsy'
import DepositForm from '../component/DepositForm'
import PendingTransaction from '../component/PendingTransaction'

const OnlineBankingContent = () => {

  return (
    <ScrollView>
      <DepositForm
        DepositCategoryId={DepositPaymentMethodCategoryId.ONLINE_BANK}
      />
      <PendingTransaction
        paymentMethod={DepositPaymentMethodCategoryId.ONLINE_BANK}
      />
    </ScrollView>
  )
}

export default OnlineBankingContent
