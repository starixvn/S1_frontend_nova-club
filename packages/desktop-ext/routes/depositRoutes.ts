import {
  DepositPaymentMethodCategoryId,
  PAYMENT_METHOD,
} from 'app/config/deposit'
import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'InstantTransfer',
    categoryId: DepositPaymentMethodCategoryId.INSTANT_TRANFER,
    title: 'deposit.depositMethod.instantTransfer',
    icon: 'instant-transfer',
    route: '/deposit/instant-transfer',
  },
  {
    key: 'BankTransfer',
    categoryId: DepositPaymentMethodCategoryId.LOCAL_BANK,
    title: 'deposit.depositMethod.bankTransfer',
    icon: 'lba',
    route: '/deposit/bank-transfer',
  },
  {
    key: 'OnlineBanking',
    categoryId: DepositPaymentMethodCategoryId.ONLINE_BANK,
    title: 'deposit.depositMethod.onlineBanking',
    icon: 'mac',
    route: '/deposit/online-banking',
  },
  {
    key: 'Momo',
    categoryId: DepositPaymentMethodCategoryId.MOMO,
    title: 'deposit.depositMethod.momo',
    icon: 'momo',
    route: '/deposit/momo',
  },
  {
    key: 'QRPay',
    categoryId: DepositPaymentMethodCategoryId.QR_CODE,
    title: 'deposit.depositMethod.qrPay',
    icon: 'qr',
    route: '/deposit/qr-pay',
  },
  {
    key: 'TopUpCard',
    categoryId: DepositPaymentMethodCategoryId.TOP_UP,
    title: 'deposit.depositMethod.topUp',
    icon: 'card',
    route: '/deposit/topup-card',
  },
  {
    key: 'Crypto',
    categoryId: DepositPaymentMethodCategoryId.CRYPTO,
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
