import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from 'app/features/splashscreen'
import { fadeScaleIn } from 'app/transitions/fade'
import ProfileScreen from 'app/features/profile'
import TabNavigation from './TabNavigation'
import LoginPage from 'app/features/auth/login'
import RegisterPage from 'app/features/auth/register'
import RegisterVerificationPage from 'app/features/auth/verification'
import { Easing } from 'react-native'
import ProfileNavigation from './ProfileNavigation'
import { useSelector } from 'react-redux'
import { RootState } from 'app/provider/redux/store'
import PreLaunchGame from 'app/features/games/PreLaunchGame'
import Deposit from 'app/features/deposit'
import WithdrawalPage from 'app/features/withdrawal'
import ForgotPassword from 'app/features/auth/forgotPassword'
import DepositNavigation from './DepositNavigation'
import CustomerSupportPage from 'app/features/customerSupport'
import GameLoaderPage from 'app/features/games/GameLoaderPage'
import OverviewScreen from '../../../../apps/next/pages/profile/overview'
import ProfileDetails from '../../../../apps/next/pages/profile/profile-details'
import ChangePasswordScreen from '../../../../apps/next/pages/profile/change-password'
import BankAccountScreen from '../../../../apps/next/pages/profile/bank-account'
import AddBankAccountScreen from '../../../../apps/next/pages/profile/bank-account/add-bank-account'
import CommissionTablePage from 'app/features/profile/commission-table'

const Stack = createStackNavigator<{
  SplashScreen: undefined
  BottomNav: undefined
  LoginPage: undefined
  RegisterPage: undefined
  DepositPage: undefined
  // ProfilePage: undefined
  PreLaunchGame: undefined
  WithdrawalPage: undefined
  ForgotPassword: undefined
  CustomerSupportPage: undefined
  RegisterVerificationPage: undefined
  GameLoaderPage: undefined
  Profile: undefined
  Overview: undefined
  ProfileDetails: undefined
  ChangePassword: undefined
  BankAccount: undefined
  AddBankAccount: undefined
  CommissionTablePage: undefined
}>()

export function NativeNavigation() {
  const loginInfo = useSelector((s: RootState) => s.player.currentLoginInfo)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
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
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="DepositPage" component={DepositNavigation} />
      <Stack.Screen
        name="RegisterVerificationPage"
        component={RegisterVerificationPage}
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
      {/* <Stack.Screen
        name="ProfilePage"
        component={ProfileNavigation}
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
      /> */}
      <Stack.Screen name="PreLaunchGame" component={PreLaunchGame} />
      <Stack.Screen
        name="WithdrawalPage"
        component={WithdrawalPage}
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
      <Stack.Screen
        name="CustomerSupportPage"
        component={CustomerSupportPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="GameLoaderPage"
        component={GameLoaderPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Overview" component={OverviewScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="BankAccount" component={BankAccountScreen} />
      <Stack.Screen name="AddBankAccount" component={AddBankAccountScreen} />

      <Stack.Screen
        name="CommissionTablePage"
        component={CommissionTablePage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
