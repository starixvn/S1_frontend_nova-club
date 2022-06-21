import { createStackNavigator } from '@react-navigation/stack'

import DepositPage from 'app/features/deposit'
import CryptoScreen from 'app/features/deposit/crypto'
import OnlineBankScreen from 'app/features/deposit/online-bank'
import TopUpCardScreen from 'app/features/deposit/topup-card'

const Deposit = createStackNavigator<{
  Deposit: undefined
  OnlineBank: undefined
  TopupCard: undefined
  Crypto: undefined
}>()

function DepositNavigation() {
  return (
    <Deposit.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Deposit.Screen name="Deposit" component={DepositPage} />
      <Deposit.Screen name="OnlineBank" component={OnlineBankScreen} />
      <Deposit.Screen name="TopupCard" component={TopUpCardScreen} />
      <Deposit.Screen name="Crypto" component={CryptoScreen} />
    </Deposit.Navigator>
  )
}

export default DepositNavigation
