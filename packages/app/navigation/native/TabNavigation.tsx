import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Casino from 'app/features/casino'
import Games from 'app/features/games'
import HomeScreen from 'app/features/home/screen'
import SlotGames from 'app/features/slots'
import Sportsbook from 'app/features/sportsbook'
import Profile from 'app/features/profile'
import BottomNavigation from '../BottomNavigation'
import MainHeader from '../MainHeader'
import FishingPage from 'app/features/fishing'
import LotteryPage from 'app/features/lottery'

const Tab = createBottomTabNavigator()

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const title = route.name

          return <MainHeader navigation={navigation} title={title} />
        },
      }}
      tabBar={(props) => <BottomNavigation />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sportsbook" component={Sportsbook} />
      <Tab.Screen name="Games" component={Games} />
      <Tab.Screen name="Slots" component={SlotGames} />
      <Tab.Screen name="Casino" component={Casino} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="FishingPage" component={FishingPage} />
      <Tab.Screen name="LotteryPage" component={LotteryPage} />
    </Tab.Navigator>
  )
}

export default TabNavigation
