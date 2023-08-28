import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ScrollView, View } from 'dripsy'
import PendingTransaction from '../component/PendingTransaction'
import TopupCardForm from './TopupCardForm'
import FormContainer from 'app/components/form/FormContainer'

const TopUpCardContent = () => {
  const horizontalMode = useIsDesktop()
  return (
    <ScrollView contentContainerSx={{ alignItems: 'center' }}>
      <FormContainer hidePadding={!horizontalMode}>
        <TopupCardForm />
      </FormContainer>
      {horizontalMode && (
        <View sx={{ width: horizontalMode ? '90%' : '100%' }}>
          <PendingTransaction
            paymentMethod={DepositPaymentMethodCategoryId.TOP_UP}
          />
        </View>
      )}
    </ScrollView>
  )
}

export default TopUpCardContent
