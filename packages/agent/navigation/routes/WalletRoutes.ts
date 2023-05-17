import { AgentRoute } from '../NavigationType'

const _Routes: Readonly<AgentRoute[]> = [
  {
    key: 'Withdrawal',
    title: 'wallet.withdrawal',
    icon: 'withdrawal',
    route: '/agent/wallet/withdrawal',
  },
  {
    key: 'Transfer',
    title: 'wallet.fundTransfer',
    icon: 'transfer',
    route: '/agent/wallet/transfer',
  },
] as const

export type WalletRoutesParamList = Record<
  typeof _Routes[number]['key'],
  undefined | object
>

const WalletRoutes = _Routes

export default WalletRoutes
