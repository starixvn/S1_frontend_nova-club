import { ComponentType } from 'react'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

// Unique key for pages that require to open Contextual Navigation
export enum ContextualModuleKey {
  Profile = 'profile',
  Deposit = 'deposit',
  Login = 'login',
}

// Ignore Dynamic import warning, as module: "esnext" is configured at app/next tsconfig.
//
const contextualComponents = {
  deposit: () => import('../../features/deposit'),
  topup: () => import('../../features/deposit/RecentTransactions'),
  'forget-password': () => import('../../features/auth/ForgotPassword'),
}

export function getContextualComponent(key: string) {
  return dynamic(contextualComponents[key], {
    loading: () => <ActivityIndicator />,
  })
}
export type ContextualComponents = keyof typeof contextualComponents
