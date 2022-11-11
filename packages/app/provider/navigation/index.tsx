import { NavigationContainer } from '@react-navigation/native'
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
  WithdrawalPage: undefined
  CommissionTablePage: undefined
  MessagePage: undefined
  FishingPage: undefined
  LotteryPage: undefined
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
              Forbidden: '/forbidden',
              Maintenance: '/maintenance',
              LoginPage: '/auth/login',
              RegisterPage: '/auth/register',
              TnC: '/auth/register/tnc',
              ForgotPassword: '/auth/forget-password',
              CommissionTablePage: '/profile/commission-table',
              DepositPage: {
                screens: {
                  Deposit: '/deposit',
                  DepositLoader: '/deposit/deposit-loader',
                  LocalBank: '/deposit/local-bank',
                  OnlineBank: '/deposit/online-bank',
                  Momo: '/deposit/momo',
                  QrTransfer: '/deposit/qr-transfer',
                  TopupCard: '/deposit/topup-card',
                  Crypto: '/deposit/crypto',
                },
              },
              WithdrawalPage: '/withdrawal',
              BottomNav: {
                screens: {
                  Home: '',
                  Sportsbook: 'sportsbook',
                  Games: '/games',
                  Slots: '/slot',
                  Casino: '/livecasino',
                },
              },
              Profile: '/profile',
              FishingPage: '/games/fishing',
              LotteryPage: '/games/lottery',
              Overview: '/profile/overview',
              ProfileDetails: '/profile/profile-details',
              ManageCredentials: '/profile/manage-credentials',
              BankAccount: '/profile/bank-account',
              AddBankAccount: '/profile/bank-account/add-bank-account',
              History: '/profile/history',
              PreLaunchGame: '/games/prelaunch',
              CustomerSupportPage: '/customer-support',
              GameLoaderPage: '/games/gameUrl',
              MessagesPage: '/messages',
              TransferScanner: '/transfer-scanner',
              Transfer: '/transfer',
              CreatePin: '/pin/create-pin',
              ChangePin: 'pin/change-pin',
              ForgotPin: 'pin/forgot-pin',
              WcPrediction: '/event/wcprediction',
              WcTnc: '/event/tnc',
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
