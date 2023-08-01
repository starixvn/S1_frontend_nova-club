import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, View, useResponsiveValue } from 'dripsy'
import PendingTransaction from '../component/PendingTransaction'
import TopupCardForm from './TopupCardForm'

const TopUpCardContent = () => {
  const horizontalMode = useResponsiveValue([false, false, false, true, true])
  return (
    <ScrollView contentContainerSx={{ alignItems: 'center' }}>
      <View sx={{ width: horizontalMode ? '70%' : '100%' }}>
        <TopupCardForm />
      </View>
      {horizontalMode && (
        <PendingTransaction
          paymentMethod={DepositPaymentMethodCategoryId.TOP_UP}
        />
      )}
    </ScrollView>
  )
}

export default TopUpCardContent
