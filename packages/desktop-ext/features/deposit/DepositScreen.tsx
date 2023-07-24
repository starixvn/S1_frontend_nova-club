import FormContainer from 'app/components/form/FormContainer'
import BankTransferContent from 'app/features/deposit/bank-transfer/BankTransferContent'
import React from 'react'

export default function DepositScreen({}) {
  return (
    // <WalletLayoutContainer leftContent={<DepositMethodMenu />}>
    <FormContainer hidePadding>
      <BankTransferContent />
    </FormContainer>
    // </WalletLayoutContainer>
  )
}
