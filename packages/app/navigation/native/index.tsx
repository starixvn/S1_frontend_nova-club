import { createStackNavigator } from '@react-navigation/stack'
import ForgotPassword from 'app/features/auth/forgotPassword'
import LoginPage from 'app/features/auth/login'
import RegisterPage from 'app/features/auth/register'
import TnC from 'app/features/auth/tnc'
import RegisterVerificationPage from 'app/features/auth/verification'
import Forbidden from 'app/features/common/Forbidden'
import Maintenance from 'app/features/common/Maintenance'
import CustomerSupportPage from 'app/features/customerSupport'
import SlotMachine from 'app/features/events/spinMania/SlotMachine'
import SpinManiaTnc from 'app/features/events/spinMania/SpinManiaTnc'
import FishingPage from 'app/features/fishing'
import GameLoaderPage from 'app/features/games/GameLoaderPage'
import MessagesPage from 'app/features/messages'
import ChangePinScreen from 'app/features/pin/change-pin'
import CreatePinScreen from 'app/features/pin/CreatePinScreen'
import ForgotPinScreen from 'app/features/pin/forgot-pin'
import ProfileScreen from 'app/features/profile'
import AccountVerification from 'app/features/profile/account-verification'
import BankAccountScreen from 'app/features/profile/bank-account'
import AddBankAccountScreen from 'app/features/profile/bank-account/add-bank-account'
import CommissionTablePage from 'app/features/profile/commission-table'
import HistoryScreen from 'app/features/profile/history'
import ManageCredentialsPage from 'app/features/profile/manage-credentials'
import OverviewScreen from 'app/features/profile/overview'
import ProfileDetails from 'app/features/profile/profile-details'
import SplashScreen from 'app/features/splashscreen'
import TransferScannerScreen from 'app/features/transferScanner'
import TransferScreen from 'app/features/transferScanner/transfer'
import WithdrawalPage from 'app/features/withdrawal'
import { fadeScaleIn } from 'app/transitions/fade'
import { Easing } from 'react-native'
import DepositNavigation from './DepositNavigation'
import MemberAgentNavigation from './MemberAgentNavigation'

const Stack = createStackNavigator<{
  SplashScreen: undefined
  MemberAgent: undefined
  LoginPage: undefined
  RegisterPage: undefined
  DepositPage: undefined
  WithdrawalPage: undefined
  ForgotPassword: undefined
  CustomerSupportPage: undefined
  RegisterVerificationPage: undefined
  GameLoaderPage: undefined
  Profile: undefined
  Overview: undefined
  ProfileDetails: undefined
  ManageCredentials: undefined
  BankAccount: undefined
  AddBankAccount: undefined
  History: undefined
  CommissionTablePage: undefined
  MessagesPage: undefined
  TransferScanner: undefined
  Transfer: undefined
  FishingPage: undefined
  CreatePin: undefined
  ChangePin: undefined
  ForgotPin: undefined
  TnC: undefined
  Forbidden: undefined
  Maintenance: undefined
  // WcPrediction: undefined
  WcTnc: undefined
  AffCup: undefined
  // WcWinnerList: undefined
  Cny: undefined
  CnyTnc: undefined
  AccountVerification: undefined
  SpinMania: undefined
  SpinManiaTnc: undefined
}>()

export function NativeNavigation() {
  // const navigation = useNavigation()
  // const { resetRTKQState } = useResetRTKQState()
  // const dispatch = useAppDispatch()
  // const isLogoutActionTriggered = useAppSelector(
  //   (state) => state.auth.isLogoutActionTriggered
  // )

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // screenListeners={{
      //   transitionEnd: (e) => {
      //     if (isLogoutActionTriggered) {
      //       /**
      //        * `setTimeout` is used here to move the logic inside to macroTask (event loop)
      //        * so the main thread umount component first before run the logic inside `setTimeout`
      //        */
      //       setTimeout(() => {
      //         /**
      //          * Reset current React Navigation stack and maintain current screen
      //          * to prevent RTKQ hook from triggered after `resetApiState()` in
      //          * `resetRTKQState` function
      //          */
      //         navigation.dispatch((state) => {
      //           const routes = state.routes.filter(
      //             (r) => r.name === 'LoginPage'
      //           )

      //           return CommonActions.reset({
      //             ...state,
      //             routes,
      //             index: routes.length - 1,
      //           })
      //         })

      //         resetRTKQState()
      //         dispatch(AuthActions.setIsLogoutActionTriggered(false))
      //       })
      //     }
      //   },
      // }}
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
          // cardStyleInterpolator: fadeScaleIn,
          // transitionSpec: {
          //   open: {
          //     animation: 'timing',
          //     config: {
          //       duration: 500,
          //       easing: Easing.ease,
          //     },
          //   },
          //   close: {
          //     animation: 'timing',
          //     config: {
          //       duration: 2000,
          //       easing: Easing.ease,
          //     },
          //   },
          // },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MemberAgent"
        component={MemberAgentNavigation}
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
      <Stack.Screen
        name="ManageCredentials"
        component={ManageCredentialsPage}
      />
      <Stack.Screen
        name="AccountVerification"
        component={AccountVerification}
      />
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
      <Stack.Screen name="TnC" component={TnC} />
      <Stack.Screen name="Forbidden" component={Forbidden} />
      <Stack.Screen name="Maintenance" component={Maintenance} />
      <Stack.Screen name="SpinMania" component={SlotMachine} />
      <Stack.Screen name="SpinManiaTnc" component={SpinManiaTnc} />
    </Stack.Navigator>
  )
}
