import { Route } from 'app/navigation/type'

const _Routes = [
  {
    key: 'BankWithdrawal',
    title: 'menu.bankWithdrawal',
    icon: 'lba',
    base: '/withdrawal',
    route: '/withdrawal/bank-withdrawal',
  },
  {
    key: 'Crypto',
    title: 'menu.cryptoWithdrawal',
    icon: 'cp',
    base: '/withdrawal',
    route: '/withdrawal/crypto-withdrawal',
  },
] as const satisfies Readonly<Route[]>

export type RewardRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const withdrawalRoutes = _Routes

export default withdrawalRoutes
