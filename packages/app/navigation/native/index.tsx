import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from 'app/features/splashscreen'
import { fadeScaleIn } from 'app/transitions/fade'
import ProfileScreen from 'app/features/profile'
import MainHeader from '../MainHeader'
import TabNavigation from './TabNavigation'
import LoginPage from 'app/features/auth/login'
import RegisterPage from 'app/features/auth/register'
import { Easing } from 'react-native'

const Stack = createStackNavigator<{
  SplashScreen: undefined
  BottomNav: undefined
  LoginPage: undefined
  RegisterPage: undefined
  Profile: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
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
        name="RegisterPage"
        component={RegisterPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          cardStyleInterpolator: fadeScaleIn,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
                easing: Easing.ease,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 2000,
                easing: Easing.ease,
              },
            },
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BottomNav"
        component={TabNavigation}
        options={{
          cardStyleInterpolator: fadeScaleIn,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
                easing: Easing.ease,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 2000,
                easing: Easing.ease,
              },
            },
          },
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}
