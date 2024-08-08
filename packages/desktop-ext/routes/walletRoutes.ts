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
    title: 'common.transfer',
    icon: 'transfer',
    route: '/transfer',
  },
  // {
  //   key: WALLET_PATH.DEPOSIT,
  //   title: 'common.deposit',
  //   icon: 'deposit',
  //   route: '/deposit',
  // },
  {
    key: WALLET_PATH.WITHDRAWAL,
    title: 'common.withdraw',
    icon: 'withdraw',
    route: '/withdrawal/bank-withdrawal',
    base: '/withdrawal',
  },
  {
    key: WALLET_PATH.HISTORY,
    title: 'common.history',
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
