import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ScrollView, View } from 'dripsy'
import PendingTransaction from '../component/PendingTransaction'
import TopupCardForm from './TopupCardForm'

const TopUpCardContent = () => {
  const horizontalMode = useIsDesktop()
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
