import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TestCarousel from 'app/features/TestCarousel'
import TestModal from 'app/features/TestModal'
import { HomeScreen } from '../../features/home/screen'
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
            <Tab.Screen name="Test" component={TestCarousel} />
            <Tab.Screen name="Test2" component={TestCarousel} />
            <Tab.Screen name="Test3" component={TestModal} />
            <Tab.Screen name="Test4" component={TestModal} />
        </Tab.Navigator>
    )
}

export default TabNavigation
