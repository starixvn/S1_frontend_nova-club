import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Casino from 'app/features/casino'
import Games from 'app/features/games'
import HomeScreen from 'app/features/home/screen'
import SlotGames from 'app/features/slots'
import Sportsbook from 'app/features/sportsbook'
import BottomNavigation from '../BottomNavigation'

const Tab = createBottomTabNavigator()

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomNavigation />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sportsbook" component={Sportsbook} />
      <Tab.Screen name="Games" component={Games} />
      <Tab.Screen name="Slots" component={SlotGames} />
      <Tab.Screen name="Casino" component={Casino} />
    </Tab.Navigator>
  )
}

export default TabNavigation
