import { NavigationContainer } from '@react-navigation/native'
import AlertModal from 'app/components/modal/AlertModal'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

/**
 * This type interface is needed to solve `linking` prop typescript problem
 * when nested route configuration is included.
 * https://github.com/react-navigation/react-navigation/issues/9897
 *
 * Object key: Should be the string pass into `name` prop in directory
 * `navigation/native`
 *
 * Object value: Parameter pass into the component
 */
interface NavigationParamList {
  SplashScreen: undefined
  LoginPage: undefined
  BottomNav: undefined
  RegisterPage: undefined
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer<NavigationParamList>
      linking={useMemo(
        () => ({
          prefixes: ['http://localhost:3000'],
          config: {
            screens: {
              SplashScreen: 'splashscreen',
              LoginPage: '/auth/login',
              RegisterPage: '/auth/register',
              BottomNav: {
                screens: {
                  Home: '',
                  Sportsbook: 'sportsbook/:name',
                  Games: '/games/:name',
                  Slots: '/slots/:name',
                  Casino: '/live/:name',
                },
              },
              ProfilePage: {
                screens: {
                  Profile: '/profile',
                  ProfileDetails: '/profile/profile-details',
                  ChangePassword: '/profile/change-password',
                  BankAccount: '/profile/bank-account',
                  AddBankAccount: '/profile/bank-account/add-bank-account',
                },
              },
              PreLaunchGame: '/games/prelaunchgame',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
