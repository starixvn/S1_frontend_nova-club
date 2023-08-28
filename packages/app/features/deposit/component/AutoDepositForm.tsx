import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ScrollView, View } from 'dripsy'
import DepositForm from '../component/DepositForm'
import PendingTransaction from '../component/PendingTransaction'
import FormContainer from 'app/components/form/FormContainer'

const AutoDepositForm = ({ depositId, showTransaction }) => {
  const horizontalMode = useIsDesktop()

  return (
    <ScrollView contentContainerSx={{ alignItems: 'center' }}>
      <FormContainer hidePadding={!horizontalMode}>
        <DepositForm DepositCategoryId={depositId} />
      </FormContainer>
      {showTransaction && (
        <View sx={{ width: horizontalMode ? '90%' : '100%' }}>
          <PendingTransaction paymentMethod={depositId} />
        </View>
      )}
    </ScrollView>
  )
}

export default AutoDepositForm
