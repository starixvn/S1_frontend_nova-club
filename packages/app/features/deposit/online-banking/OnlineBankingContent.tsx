import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import AutoDepositForm from '../component/AutoDepositForm'

const OnlineBankingContent = () => {
  return (
    <AutoDepositForm
      depositId={DepositPaymentMethodCategoryId.ONLINE_BANK}
      showTransaction
    />
  )
}

export default OnlineBankingContent
