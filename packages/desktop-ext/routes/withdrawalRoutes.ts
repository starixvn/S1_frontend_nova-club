import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'BankWithdrawal',
    title: 'deposit.depositMethod.bankTransfer',
    icon: 'lba',
    route: '/withdrawal/bank-withdrawal',
  },
  {
    key: 'Crypto',
    title: 'deposit.depositMethod.crypto',
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
