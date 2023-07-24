import TransferPage from 'agent/features/wallet/transfer'
import WithdrawalPage from 'agent/features/wallet/withdrawal'
import React from 'react'
import { createAgentNestedTabNavigator } from '../components/AgentNestedTabNavigator'
import WalletRoutes, { WalletRoutesParamList } from '../routes/WalletRoutes'

const Tab = createAgentNestedTabNavigator<WalletRoutesParamList>(WalletRoutes)

const WalletNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Withdrawal" component={WithdrawalPage} />
      <Tab.Screen name="Transfer" component={TransferPage} />
    </Tab.Navigator>
  )
}

export default WalletNavigation
