import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ScrollView, View, useResponsiveValue } from 'dripsy'
import PendingTransaction from '../component/PendingTransaction'
import TopupCardForm from './TopupCardForm'

const TopUpCardContent = () => {
  const horizontalMode = useResponsiveValue([false, false, false, true, true])
  return (
    <ScrollView>
      <View>
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
