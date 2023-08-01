import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'BankWithdrawal',
    title: 'menu.bankWithdrawal',
    icon: 'lba',
    route: '/withdrawal/bank-withdrawal',
  },
  {
    key: 'Crypto',
    title: 'menu.cryptoWithdrawal',
    icon: 'cp',
    route: '/withdrawal/crypto-withdrawal',
  },
] as const

export type WithdrawalRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const WithdrawalRoutes = _Routes

export default WithdrawalRoutes
