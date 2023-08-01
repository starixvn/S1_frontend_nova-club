import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'BankTransfer',
    title: 'deposit.depositMethod.bankTransfer',
    icon: 'lba',
    route: '/deposit/bank-transfer',
  },
  {
    key: 'OnlineBanking',
    title: 'deposit.depositMethod.onlineBanking',
    icon: 'mac',
    route: '/deposit/online-banking',
  },
  {
    key: 'Momo',
    title: 'deposit.depositMethod.momo',
    icon: 'momo',
    route: '/deposit/momo',
  },
  {
    key: 'QRPay',
    title: 'deposit.depositMethod.qrPay',
    icon: 'qr',
    route: '/deposit/qr-pay',
  },
  {
    key: 'TopUpCard',
    title: 'deposit.depositMethod.topUp',
    icon: 'card',
    route: '/deposit/topup-card',
  },
  {
    key: 'Crypto',
    title: 'deposit.depositMethod.crypto',
    icon: 'cp',
    route: '/deposit/crypto',
  },
] as const

export type DepositRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const DepositRoutes = _Routes

export default DepositRoutes
