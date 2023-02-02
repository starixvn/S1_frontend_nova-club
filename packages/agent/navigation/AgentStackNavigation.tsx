import { createStackNavigator } from '@react-navigation/stack'
import AgentProvider from 'agent/provider'
import {
  AgentStackParamList,
  AgentStackScreens,
} from './components/AgentStackScreen'

const Stack = createStackNavigator<AgentStackParamList>()

export function AgentStackNavigation() {
  return (
    <AgentProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
      >
        {AgentStackScreens.map((screen) => {
          return (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={screen.options}
            />
          )
        })}
      </Stack.Navigator>
    </AgentProvider>
  )
}
