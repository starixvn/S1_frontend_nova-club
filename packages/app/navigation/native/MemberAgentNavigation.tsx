import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AgentStackNavigation } from 'agent/navigation/AgentStackNavigation'
import Icon from 'app/components/Icon'
import TabNavigation from './TabNavigation'

const Tab = createBottomTabNavigator()

const MemberAgentNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={() => null}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Member"
        component={TabNavigation}
        options={{
          tabBarIcon: ({ color }) => <Icon name="avatar" color={color} />,
        }}
      />
      <Tab.Screen
        name="Agent"
        component={AgentStackNavigation}
        options={{
          tabBarIcon: ({ color }) => <Icon name="profile" color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default MemberAgentNavigation
