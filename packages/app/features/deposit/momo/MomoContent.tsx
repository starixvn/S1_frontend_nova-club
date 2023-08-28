import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import AutoDepositForm from '../component/AutoDepositForm'
const MomoContent = () => {
  const horizontalMode = useIsDesktop()

  return (
    <AutoDepositForm
      depositId={DepositPaymentMethodCategoryId.MOMO}
      showTransaction={horizontalMode}
    />
  )
}

export default MomoContent
