import { createStackNavigator } from '@react-navigation/stack'

import DepositPage from 'app/features/deposit'
import TopUpCardScreen from 'app/features/deposit/topup-card'

const Deposit = createStackNavigator<{
  Deposit: undefined
  TopupCard: undefined
}>()

function DepositNavigation() {
  return (
    <Deposit.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Deposit.Screen name="Deposit" component={DepositPage} />
      <Deposit.Screen name="TopupCard" component={TopUpCardScreen} />
    </Deposit.Navigator>
  )
}

export default DepositNavigation
