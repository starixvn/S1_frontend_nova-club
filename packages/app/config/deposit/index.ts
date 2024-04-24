export enum DepositPaymentMethodCategoryId {
  LOCAL_BANK = 7,
  ONLINE_BANK = 1,
  MOMO = 26,
  QR_CODE = 27,
  TOP_UP = 25,
  CRYPTO = 9,
  INSTANT_TRANFER = 28,
  // E_WALLET = 29,
  PROMPTPAY = 30,
  TRUEMONEY = 31,
}

export enum DepositPaymentMethodCategoryType {
  AUTO = 'auto',
  MANUAL = 'manual',
}

export enum DepositMethodId {
  INSTANT_TRANFER = 1,
  LOCAL_BANK = 2,
  ONLINE_BANK = 3,
  MOMO = 4,
  QR_CODE = 5,
  TOP_UP = 6,
  CRYPTO = 7,
  E_WALLET = 8,
}

export type PaymentMethodProps = {
  id: number
  type: DepositPaymentMethodCategoryType
  categoryId: DepositPaymentMethodCategoryId | DepositPaymentMethodCategoryId[]
  name: string
  icon: string
  color: string
  active: boolean
  path: string
}

export const PaymentMethod: PaymentMethodProps[] = [
  {
    id: DepositMethodId.INSTANT_TRANFER,
    type: DepositPaymentMethodCategoryType.AUTO,
    categoryId: DepositPaymentMethodCategoryId.INSTANT_TRANFER,
    name: 'deposit.depositMethod.instantTransfer',
    path: `/deposit/instant-transfer`,
    icon: 'instant-transfer',
    color: '#1E2238',
    active: true,
  },
  {
    id: DepositMethodId.LOCAL_BANK,
    type: DepositPaymentMethodCategoryType.MANUAL,
    categoryId: DepositPaymentMethodCategoryId.LOCAL_BANK,
    name: 'deposit.depositMethod.bankTransfer',
    path: `/deposit/bank-transfer`,
    icon: 'lba',
    color: '#1E2238',
    active: true,
  },
  {
    id: DepositMethodId.ONLINE_BANK,
    type: DepositPaymentMethodCategoryType.AUTO,
    categoryId: DepositPaymentMethodCategoryId.ONLINE_BANK,
    name: 'deposit.depositMethod.onlineBanking',
    path: `/deposit/online-banking`,
    icon: 'mac',
    color: '#1E2238',
    active: true,
  },
  {
    id: DepositMethodId.MOMO,
    type: DepositPaymentMethodCategoryType.AUTO,
    categoryId: DepositPaymentMethodCategoryId.MOMO,
    name: 'deposit.depositMethod.momo',
    path: '/deposit/momo',
    icon: 'momo',
    color: '#1E2238',
    active: true,
  },
  {
    id: DepositMethodId.QR_CODE,
    type: DepositPaymentMethodCategoryType.AUTO,
    categoryId: DepositPaymentMethodCategoryId.QR_CODE,
    name: 'deposit.depositMethod.qrPay',
    path: `/deposit/qr-pay`,
    icon: 'qr',
    color: '#1E2238',
    active: true,
  },
  {
    id: DepositMethodId.TOP_UP,
    type: DepositPaymentMethodCategoryType.AUTO,
    categoryId: DepositPaymentMethodCategoryId.TOP_UP,
    name: 'deposit.depositMethod.topUp',
    path: '/deposit/topup-card',
    icon: 'card',
    color: '#1E2238',
    active: true,
  },
  {
    id: DepositMethodId.CRYPTO,
    type: DepositPaymentMethodCategoryType.AUTO,
    categoryId: DepositPaymentMethodCategoryId.CRYPTO,
    name: 'deposit.depositMethod.crypto',
    path: '/deposit/crypto',
    icon: 'cp',
    color: '#1E2238',
    active: true,
  },
  {
    id: DepositMethodId.E_WALLET,
    type: DepositPaymentMethodCategoryType.AUTO,
    categoryId: [
      DepositPaymentMethodCategoryId.PROMPTPAY,
      DepositPaymentMethodCategoryId.TRUEMONEY,
    ],
    name: 'deposit.depositMethod.eWallet',
    path: '/deposit/e-wallet',
    icon: 'mobile',
    color: '#1E2238',
    active: true,
  },
]

export default PaymentMethod
