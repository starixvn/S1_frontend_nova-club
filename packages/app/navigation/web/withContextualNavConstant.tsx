import { ComponentType } from 'react'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

// Unique key for pages that require to open Contextual Navigation
export enum ContextualModuleKey {
  Profile = 'profile',
  BankAccount = 'bankAccount',
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
  Login = 'login',
  Game = 'game',
  PreLaunchGame = 'prelaunchgame',
}

// Ignore Dynamic import warning, as module: "esnext" is configured at app/next tsconfig.
//
const contextualComponents = {
  deposit: () => import('../../features/deposit'),
  'topup-card': () => import('../../features/deposit/topup-card'),
  crypto: () => import('app/features/deposit/crypto'),
  withdrawal: () => import('app/features/withdrawal'),
  'bank-account': () => import('app/features/profile/bank-account'),
  'add-bank-account': () =>
    import('app/features/profile/bank-account/add-bank-account'),
  'profile-details': () => import('app/features/profile/profile-details'),
  'change-password': () => import('app/features/profile/change-password'),
  'forget-password': () => import('../../features/auth/ForgotPassword'),
  prelaunchgame: () => import('../../features/games/PreLaunchGame'),
  'game-url': () => import('../../features/games/GameLoaderPage'),
}

export function getContextualComponent(key: string) {
  return dynamic(contextualComponents[key], {
    loading: () => <ActivityIndicator />,
  })
}
export type ContextualComponents = keyof typeof contextualComponents
