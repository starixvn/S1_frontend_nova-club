import FormContainer from 'app/components/form/FormContainer'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import BankTransferContent from 'app/features/deposit/bank-transfer/BankTransferContent'
import CryptoPayContent from 'app/features/deposit/crypto/CryptoPayContent'
import MomoContent from 'app/features/deposit/momo/MomoContent'
import OnlineBankingContent from 'app/features/deposit/online-banking/OnlineBankingContent'
import QRPayContent from 'app/features/deposit/qr-pay/QRPayContent'
import useDepositList from 'app/features/deposit/tools/useDepositList'
import TopUpCardContent from 'app/features/deposit/topup-card/TopUpCardContent'
import DepositRoutes from 'desktop-ext/routes/depositRoutes'
import React, { useMemo } from 'react'

const DepositScreen = () => {
  const { paymentMethodList } = useDepositList()

  const availableRoutes = DepositRoutes.filter((route) =>
    paymentMethodList.find((el) => route.categoryId === el.categoryId)
  )

  const memoContent = useMemo(() => {
    switch (availableRoutes[0]?.categoryId) {
      case DepositPaymentMethodCategoryId.LOCAL_BANK:
        return <BankTransferContent />
      case DepositPaymentMethodCategoryId.ONLINE_BANK:
        return <OnlineBankingContent />
      case DepositPaymentMethodCategoryId.MOMO:
        return <MomoContent />
      case DepositPaymentMethodCategoryId.QR_CODE:
        return <QRPayContent />
      case DepositPaymentMethodCategoryId.TOP_UP:
        return <TopUpCardContent />
      case DepositPaymentMethodCategoryId.CRYPTO:
        return <CryptoPayContent />

      default:
        break
    }
  }, [availableRoutes])

  return (
    <FormContainer hidePadding sx={{ width: '90%' }}>
      {memoContent}
    </FormContainer>
  )
}

export default DepositScreen
