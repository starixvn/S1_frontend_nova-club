import Icon from 'agent/components/Icon'
import AgentListing from 'agent/features/agent/AgentListing'
import ShareholderListing from 'agent/features/shareholder/ShareholderListing'
import { useDripsyTheme } from 'dripsy'
import React from 'react'
import { createMyCustomNestedNavigator } from './components/CustomNestedTabBar'

const Tab = createMyCustomNestedNavigator()

const AgentShareholderListingNavigation = () => {
  const { theme } = useDripsyTheme()
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Shareholder"
        component={ShareholderListing}
        options={{
          title: 'common.shareholder',
          tabBarIcon: () => (
            <Icon name="shareholder" color={'white'} size={20} />
          ),
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: theme.colors.$inactivePrimaryAgent,
        }}
      />
      <Tab.Screen
        name="Agent"
        component={AgentListing}
        options={{
          title: 'common.agent',
          tabBarIcon: () => <Icon name="agent" color={'white'} size={20} />,
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: theme.colors.$inactivePrimaryAgent,
        }}
      />
    </Tab.Navigator>
  )
}

export default AgentShareholderListingNavigation
