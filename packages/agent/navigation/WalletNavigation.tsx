import Icon from 'agent/components/Icon'
import AgentFundTransferPage from 'agent/features/wallet/transfer'
import AgentWithdrawalPage from 'agent/features/wallet/withdrawal'
import { useDripsyTheme } from 'dripsy'
import React from 'react'
import { createMyCustomNestedNavigator } from './components/CustomNestedTabBar'

const Tab = createMyCustomNestedNavigator()

const WalletNavigation = () => {
  const { theme } = useDripsyTheme()
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Withdrawal"
        component={AgentWithdrawalPage}
        options={{
          title: 'wallet.withdrawal',
          tabBarIcon: () => (
            <Icon name="withdrawal" color={'white'} size={20} />
          ),
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: theme.colors.$inactivePrimaryAgent,
        }}
      />
      <Tab.Screen
        name="Fund Transfer"
        component={AgentFundTransferPage}
        options={{
          title: 'wallet.fundTransfer',
          tabBarIcon: () => <Icon name="transfer" color={'white'} size={20} />,
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: theme.colors.$inactivePrimaryAgent,
        }}
      />
    </Tab.Navigator>
  )
}

export default WalletNavigation
