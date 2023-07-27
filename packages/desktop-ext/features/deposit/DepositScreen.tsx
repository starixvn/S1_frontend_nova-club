import FormContainer from 'app/components/form/FormContainer'
import BankTransferContent from 'app/features/deposit/bank-transfer/BankTransferContent'
import React from 'react'

export default function DepositScreen({}) {
  return (
    // <WalletLayoutContainer leftContent={<DepositMethodMenu />}>
    <FormContainer hidePadding sx={{ width: '90%' }}>
      <BankTransferContent />
    </FormContainer>
    // </WalletLayoutContainer>
  )
}
