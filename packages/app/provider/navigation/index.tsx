import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
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
  CNYCatSpinPage: undefined
}

// TODO Do we need theme on nav provider ?
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: '#033454',
  },
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer<NavigationParamList>
      // theme={MyTheme}
      linking={useMemo(
        () => ({
          prefixes: ['http://localhost:3000', 'https://vui123vn.com'],
          config: {
            screens: {
              SplashScreen: 'splashscreen',
              MemberAgent: {
                // Tab
                screens: {
                  Member: {
                    // Stack
                    screens: {
                      Home: '',
                      Sportsbook: 'sportsbook',
                      Games: '/games',
                      Slots: '/slot',
                      Casino: '/livecasino',
                    },
                  },
                  Agent: {
                    // Stack
                    screens: {
                      AgentMainTabNavigation: {
                        // Tab
                        path: '/agent',
                        screens: {
                          AgentProfile: '/profile',
                          MemberList: '/member',
                          Barcode: '/barcode',
                          Add: {
                            // Tab
                            path: '/add',
                            initialRouteName: 'AddShareholder',
                            screens: {
                              AddShareholder: '/shareholder',
                              AddAgent: '/agent',
                            },
                          },
                          Wallet: {
                            path: '/wallet',
                            initialRouteName: 'Withdrawal',
                            screens: {
                              Withdrawal: '/withdrawal',
                              Transfer: '/transfer',
                            },
                          },
                          List: {
                            path: '/list',
                            initialRouteName: 'ListShareholder',
                            screens: {
                              ListShareholder: '/shareholder',
                              ListAgent: '/agent',
                            },
                          },
                          Report: {
                            path: '/report',
                            initialRouteName: 'Commission',
                            screens: {
                              Commission: '/commission',
                              Transaction: '/transaction',
                            },
                          },
                        },
                      },
                      ShareholderDetails: '/agent/list/shareholder/:id',
                      AgentDetails: '/agent/list/agent/:id',
                      AgentCommission: '/agent/commission-table',
                      AddBankInfo: '/agent/wallet/withdrawal/add-bank',
                      AgentCreatePin: '/agent/create-pin',
                      AgentResetPin: '/agent/reset-pin',
                      AgentChangePassword: '/agent/change-password',
                      AgentResetPassword: '/agent/reset-password',
                    },
                  },
                },
              },
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
              BankWithdrawalPage: '/withdrawal/bank',
              CryptoWithdrawalPage: '/withdrawal/crypto',
              Profile: '/profile',
              FishingPage: '/games/fishing',
              LotteryPage: '/games/lottery',
              Overview: '/profile/overview',
              ProfileDetails: '/profile/profile-details',
              ManageCredentials: '/profile/manage-credentials',
              BankAccount: '/profile/bank-account',
              AddBankAccount: '/profile/bank-account/add-bank-account',
              AddCryptoAccount: '/profile/bank-account/add-crypto-account',
              History: '/profile/history',
              CustomerSupportPage: '/customer-support',
              GameLoaderPage: '/games/gameUrl',
              MessagesPage: '/messages',
              TransferScanner: '/transfer-scanner',
              Transfer: '/transfer',
              CreatePin: '/pin/create-pin',
              ChangePin: 'pin/change-pin',
              ForgotPin: 'pin/forgot-pin',
              AccountVerification: '/profile/account-verification',
              SummerCat: '/event/sea-game',
              CatEventTnc: '/event/sea-game-event-tnc',
              AgentRecruitmentTnc: '/banner/agent-tnc',
              Prediction: '/event/prediction',
              PredictionTnc: '/event/prediction-tnc',
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
