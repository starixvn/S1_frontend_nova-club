import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import AutoDepositForm from '../component/AutoDepositForm'

const QRPayContent = () => {
  const horizontalMode = useIsDesktop()

  return (
    <AutoDepositForm
      depositId={DepositPaymentMethodCategoryId.QR_CODE}
      showTransaction={horizontalMode}
    />
  )
}

export default QRPayContent
