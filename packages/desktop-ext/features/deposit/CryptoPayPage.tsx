import FormContainer from 'app/components/form/FormContainer'
import CryptoPayContent from 'app/features/deposit/crypto/CryptoPayContent'
import React from 'react'

export default function CryptoPayPage() {
  return (
    <FormContainer hidePadding sx={{ width: '90%' }}>
      <CryptoPayContent />
    </FormContainer>
  )
}
