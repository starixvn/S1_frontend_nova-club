import FormContainer from 'app/components/form/FormContainer'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ScrollView, View } from 'dripsy'
import React from 'react'
import PendingTransaction from '../component/PendingTransaction'
import EWalletForm from './EWalletForm'

type Props = {}

export default function EWalletContent({}: Props) {
  const horizontalMode = useIsDesktop()
  return (
    <ScrollView contentContainerSx={{ alignItems: 'center' }}>
      <FormContainer hidePadding={!horizontalMode}>
        <EWalletForm />
      </FormContainer>
      {horizontalMode && (
        <View sx={{ width: horizontalMode ? '90%' : '100%' }}>
          <PendingTransaction
            paymentMethod={DepositPaymentMethodCategoryId.E_WALLET}
          />
        </View>
      )}
    </ScrollView>
  )
}
