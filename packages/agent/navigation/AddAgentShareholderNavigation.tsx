import Icon from 'agent/components/Icon'
import AddAgent from 'agent/features/agent/AddAgent'
import AddShareholder from 'agent/features/shareholder/AddShareholder'
import { ShareholderAgent } from 'agent/features/shareholder/components/CreateForm'
import { useDripsyTheme } from 'dripsy'
import React from 'react'
import { createMyCustomNestedNavigator } from './components/CustomNestedTabBar'

const Tab = createMyCustomNestedNavigator()

const AddAgentShareholderNavigation = () => {
  const { theme } = useDripsyTheme()
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="AddShareholder"
        component={AddShareholder}
        initialParams={{ screen: ShareholderAgent.Shareholder }}
        options={{
          title: 'Shareholder',
          tabBarIcon: () => <Icon name="add-agent" color={'white'} size={20} />,
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: theme.colors.$inactivePrimaryAgent,
        }}
      />
      <Tab.Screen
        name="AddAgent"
        component={AddAgent}
        initialParams={{ screen: ShareholderAgent.Agent }}
        options={{
          title: 'Agent',
          tabBarIcon: () => <Icon name="add-agent" color={'white'} size={20} />,
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: theme.colors.$inactivePrimaryAgent,
        }}
      />
    </Tab.Navigator>
  )
}

export default AddAgentShareholderNavigation
