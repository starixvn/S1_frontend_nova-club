import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AgentMainTabNavigation from './AgentMainTabNavigation'
import Icon from 'agent/components/Icon'
import FilterScreen from 'agent/features/floatingContent/Filter'

const Stack = createStackNavigator<{
  Agent: undefined
  FilterScreen: undefined
}>()

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Agent">
      <Stack.Screen
        name="Agent"
        component={AgentMainTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          title: 'Filter',
        }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigation
