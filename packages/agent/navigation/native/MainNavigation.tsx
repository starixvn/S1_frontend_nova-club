import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AgentMainTabNavigation from './AgentMainTabNavigation'

const Stack = createStackNavigator<{
  Agent: undefined
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
    </Stack.Navigator>
  )
}

export default MainNavigation
