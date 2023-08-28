import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import AutoDepositForm from '../component/AutoDepositForm'

const CryptoPayContent = () => {
  const horizontalMode = useIsDesktop()
  return (
    <AutoDepositForm
      depositId={DepositPaymentMethodCategoryId.CRYPTO}
      showTransaction={horizontalMode}
    />
  )
}

export default CryptoPayContent
