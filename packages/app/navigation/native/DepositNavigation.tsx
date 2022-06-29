import { createStackNavigator } from '@react-navigation/stack'

import DepositPage from 'app/features/deposit'
import CryptoScreen from 'app/features/deposit/crypto'
import DepositLoaderScreen from 'app/features/deposit/deposit-loader'
import LocalBankScreen from 'app/features/deposit/local-bank'
import OnlineBankScreen from 'app/features/deposit/online-bank'
import TopUpCardScreen from 'app/features/deposit/topup-card'
import MomoScreen from 'app/features/deposit/momo'
import QrTransferScreen from 'app/features/deposit/qr-transfer'

const Deposit = createStackNavigator<{
  Deposit: undefined
  LocalBank: undefined
  OnlineBank: undefined
  Momo: undefined
  QrTransfer: undefined
  TopupCard: undefined
  Crypto: undefined
  DepositLoader: undefined
}>()

function DepositNavigation() {
  return (
    <Deposit.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Deposit.Screen name="Deposit" component={DepositPage} />
      <Deposit.Screen name="LocalBank" component={LocalBankScreen} />
      <Deposit.Screen name="OnlineBank" component={OnlineBankScreen} />
      <Deposit.Screen name="Momo" component={MomoScreen} />
      <Deposit.Screen name="QrTransfer" component={QrTransferScreen} />
      <Deposit.Screen name="TopupCard" component={TopUpCardScreen} />
      <Deposit.Screen name="Crypto" component={CryptoScreen} />
      <Deposit.Screen name="DepositLoader" component={DepositLoaderScreen} />
    </Deposit.Navigator>
  )
}

export default DepositNavigation
