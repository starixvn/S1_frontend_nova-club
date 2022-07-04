import { ComponentType } from 'react'
import { ActivityIndicator, View } from 'dripsy'
import dynamic from 'next/dynamic'
import { PageWithBackHeader } from 'app/components/layout/Page'

// Unique key for pages that require to open Contextual Navigation
export enum ContextualModuleKey {
  Home = 'home',
  Profile = 'profile',
  BankAccount = 'bankAccount',
  Deposit = 'deposit',
  DepositOnline = 'depositOnline',
  DepositMomo = 'depositMomo',
  DepositQr = 'depositQr',
  Withdrawal = 'withdrawal',
  Login = 'login',
  Game = 'game',
  PreLaunchGame = 'prelaunchgame',
  Slot = 'slot',
  Sportsbook = 'sportsbook',
  LiveCasino = 'casino',
}

// Ignore Dynamic import warning, as module: "esnext" is configured at app/next tsconfig.
const contextualComponents = {
  deposit: () => import('../../features/deposit'),
  'deposit-loader': () => import('../../features/deposit/deposit-loader'),
  'local-bank': () => import('../../features/deposit/local-bank'),
  'online-bank': () => import('../../features/deposit/online-bank'),
  momo: () => import('../../features/deposit/momo'),
  'qr-transfer': () => import('../../features/deposit/qr-transfer'),
  'topup-card': () => import('../../features/deposit/topup-card'),
  crypto: () => import('app/features/deposit/crypto'),
  withdrawal: () => import('app/features/withdrawal'),
  'bank-account': () => import('app/features/profile/bank-account'),
  'add-bank-account': () =>
    import('app/features/profile/bank-account/add-bank-account'),
  history: () => import('app/features/profile/history'),
  'profile-details': () => import('app/features/profile/profile-details'),
  'change-password': () => import('app/features/profile/change-password'),
  'forget-password': () => import('../../features/auth/forgotPassword'),
  '/games/prelaunch': () => import('../../features/games/PreLaunchGame'),
  'game-url': () => import('../../features/games/GameLoaderPage'),
  'commission-table': () => import('../../features/profile/commission-table'),
  messages: () => import('../../features/messages'),
}

export function getContextualComponent(key: string) {
  return dynamic(contextualComponents[key], {
    loading: (props) => {
      return (
        <PageWithBackHeader header={{ title: ' ' }}>
          <ActivityIndicator sx={{ mt: '$10' }} />
        </PageWithBackHeader>
      )
    },
  })
}
export type ContextualComponents = keyof typeof contextualComponents
