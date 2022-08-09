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
import FishingPage from 'app/features/fishing'
import WithdrawalPage from 'app/features/withdrawal'
import ForgotPassword from 'app/features/auth/forgotPassword'
import DepositNavigation from './DepositNavigation'
import CustomerSupportPage from 'app/features/customerSupport'
import GameLoaderPage from 'app/features/games/GameLoaderPage'
import OverviewScreen from 'app/features/profile/overview'
import ProfileDetails from 'app/features/profile/profile-details'
import ChangePasswordScreen from 'app/features/profile/change-password'
import BankAccountScreen from 'app/features/profile/bank-account'
import AddBankAccountScreen from 'app/features/profile/bank-account/add-bank-account'
import CommissionTablePage from 'app/features/profile/commission-table'
import HistoryScreen from 'app/features/profile/history'
import MessagesPage from 'app/features/messages'
import LotteryPage from 'app/features/lottery'
import TransferScreen from 'app/features/transferScanner/transfer'
import TransferScannerScreen from 'app/features/transferScanner'
import CreatePinScreen from 'app/features/pin/CreatePinScreen'
import ChangePinScreen from 'app/features/pin/change-pin'
import ForgotPinScreen from 'app/features/pin/forgot-pin'

const Stack = createStackNavigator<{
  SplashScreen: undefined
  BottomNav: undefined
  LoginPage: undefined
  RegisterPage: undefined
  DepositPage: undefined
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
  History: undefined
  CommissionTablePage: undefined
  MessagesPage: undefined
  TransferScanner: undefined
  Transfer: undefined
  FishingPage: undefined
  LotteryPage: undefined
  CreatePin: undefined
  ChangePin: undefined
  ForgotPin: undefined
}>()

export function NativeNavigation() {
  const loginInfo = useSelector((s: RootState) => s.auth.info)

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

      <Stack.Screen name="PreLaunchGame" component={PreLaunchGame} />
      <Stack.Screen name="WithdrawalPage" component={WithdrawalPage} />
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
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen
        name="CommissionTablePage"
        component={CommissionTablePage}
      />
      <Stack.Screen name="MessagesPage" component={MessagesPage} />
      <Stack.Screen name="TransferScanner" component={TransferScannerScreen} />
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen name="CreatePin" component={CreatePinScreen} />
      <Stack.Screen name="ChangePin" component={ChangePinScreen} />
      <Stack.Screen name="ForgotPin" component={ForgotPinScreen} />
      <Stack.Screen name="FishingPage" component={FishingPage} />
      <Stack.Screen name="LotteryPage" component={LotteryPage} />
    </Stack.Navigator>
  )
}
