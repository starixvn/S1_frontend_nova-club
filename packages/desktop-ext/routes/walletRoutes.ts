import { DesktopRoute } from './NavigationType'

export enum WALLET_PATH {
  TRANSFER = '/transfer',
  DEPOSIT = '/deposit',
  WITHDRAWAL = '/withdrawal',
  HISTORY = '/history',
}

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: WALLET_PATH.TRANSFER,
    title: 'Transfer',
    icon: 'transfer',
    route: '/transfer',
  },
  {
    key: WALLET_PATH.DEPOSIT,
    title: 'Deposit',
    icon: 'deposit',
    route: '/deposit',
  },
  {
    key: WALLET_PATH.WITHDRAWAL,
    title: 'Withdrawal',
    icon: 'withdraw',
    route: '/withdrawal/bank-withdrawal',
    base: '/withdrawal',
  },
  {
    key: WALLET_PATH.HISTORY,
    title: 'History',
    icon: 'history',
    route: '/history',
  },
] as const

export type WalletRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const WalletRoutes = _Routes

export default WalletRoutes
