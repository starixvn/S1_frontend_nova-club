import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, View, useResponsiveValue } from 'dripsy'
import PendingTransaction from '../component/PendingTransaction'
import BankTransferForm from './BankTransferForm'
import useIsDesktop from 'app/hooks/useIsDesktop'
import FormContainer from 'app/components/form/FormContainer'

const BankTransferContent = () => {
  const horizontalMode = useIsDesktop()
  return (
    <ScrollView contentContainerSx={{ alignItems: 'center' }}>
      <FormContainer hidePadding={!horizontalMode}>
        <BankTransferForm />
      </FormContainer>

      <View sx={{ width: horizontalMode ? '90%' : '100%' }}>
        <PendingTransaction
          paymentMethod={DepositPaymentMethodCategoryId.TOP_UP}
        />
      </View>
    </ScrollView>
  )
}

export default BankTransferContent
