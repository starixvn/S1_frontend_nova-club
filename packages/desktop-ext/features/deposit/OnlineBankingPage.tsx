import FormContainer from 'app/components/form/FormContainer'
import OnlineBankingContent from 'app/features/deposit/online-banking/OnlineBankingContent'
import React from 'react'

export default function DepositScreen({}) {
  return (
    <FormContainer hidePadding>
      <OnlineBankingContent />
    </FormContainer>
  )
}
