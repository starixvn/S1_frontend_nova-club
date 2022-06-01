import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from 'app/features/splashscreen'
import { fadeScaleIn, forFadeFromCenter } from 'app/transitions/test'
import MainHeader from '../MainHeader'
import TabNavigation from './TabNavigation'

const Stack = createStackNavigator<{
  SplashScreen: undefined
  BottomNav: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        header: ({ navigation, route, options }) => {
          const title = route.name

          return <MainHeader navigation={navigation} title={title} />
        },
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="BottomNav"
        component={TabNavigation}
        options={{
          cardStyleInterpolator: fadeScaleIn,
        }}
      />
    </Stack.Navigator>
  )
}
