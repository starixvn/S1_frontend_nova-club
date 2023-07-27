import FormContainer from 'app/components/form/FormContainer'
import TopUpCardContent from 'app/features/deposit/topup-card/TopUpCardContent'
import React from 'react'

export default function TopUpCardPage() {
  return (
    <FormContainer hidePadding sx={{ width: '90%' }}>
      <TopUpCardContent />
    </FormContainer>
  )
}
