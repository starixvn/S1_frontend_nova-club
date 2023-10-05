import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import AutoDepositForm from '../component/AutoDepositForm'
const InstantTransferContent = () => {
  const horizontalMode = useIsDesktop()

  return (
    <AutoDepositForm
      depositId={DepositPaymentMethodCategoryId.INSTANT_TRANFER}
      showTransaction={horizontalMode}
    />
  )
}

export default InstantTransferContent
