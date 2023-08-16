import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, View, useResponsiveValue } from 'dripsy'
import PendingTransaction from '../component/PendingTransaction'
import BankTransferForm from './BankTransferForm'

const BankTransferContent = () => {
  const horizontalMode = useResponsiveValue([
    '100%',
    '100%',
    '100%',
    '70%',
    '70%',
  ])

  return (
    <ScrollView contentContainerSx={{ alignItems: 'center' }}>
      <View sx={{ width: horizontalMode }}>
        <BankTransferForm />
      </View>
      <PendingTransaction
        paymentMethod={DepositPaymentMethodCategoryId.LOCAL_BANK}
      />
    </ScrollView>
  )
}

export default BankTransferContent
