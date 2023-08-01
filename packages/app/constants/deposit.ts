export enum DepositCategoryId {
  LOCAL_BANK = 7,
  ONLINE_BANK = 1,
  MOMO = 26,
  QR_CODE = 27,
  TOP_UP = 25,
  CRYPTO = 9,
}

export enum DepositCategoryType {
  LOCAL_BANK = 'manual',
  ONLINE_BANK = 'auto',
  MOMO = 'auto',
  QR_CODE = 'auto',
  TOP_UP = 'auto',
  CRYPTO = 'auto',
}

export enum DepositMethodId {
  LOCAL_BANK = 1,
  ONLINE_BANK = 2,
  MOMO = 3,
  QR_CODE = 4,
  TOP_UP = 5,
  CRYPTO = 6,
}

export const PAYMENT_METHOD = {
  LOCAL_BANK: {
    id: DepositMethodId.LOCAL_BANK,
    type: DepositCategoryType.LOCAL_BANK,
    categoryId: DepositCategoryId.LOCAL_BANK,
    name: 'deposit.depositMethod.bankTransfer',
    icon: 'lba',
    color: '#ac0102',
    active: true,
  },
  ONLINE_BANK: {
    id: DepositMethodId.ONLINE_BANK,
    type: DepositCategoryType.ONLINE_BANK,
    categoryId: DepositCategoryId.ONLINE_BANK,
    name: 'deposit.depositMethod.onlineBanking',
    icon: 'mac',
    color: '#f56e04',
    active: true,
  },
  MOMO: {
    id: DepositMethodId.MOMO,
    type: DepositCategoryType.MOMO,
    categoryId: DepositCategoryId.MOMO,
    name: 'deposit.depositMethod.momo',
    icon: 'momo',
    color: '#AC016C',
    active: true,
  },
  QR_CODE: {
    id: DepositMethodId.QR_CODE,
    type: DepositCategoryType.QR_CODE,
    categoryId: DepositCategoryId.QR_CODE,
    name: 'deposit.depositMethod.qrPay',
    icon: 'qr',
    color: '#44BAF9',
    active: true,
  },
  TOP_UP: {
    id: DepositMethodId.TOP_UP,
    type: DepositCategoryType.TOP_UP,
    categoryId: DepositCategoryId.TOP_UP,
    name: 'deposit.depositMethod.topUp',
    icon: 'card',
    color: '#95AC00',
    active: true,
  },
  CRYPTO: {
    id: DepositMethodId.CRYPTO,
    type: DepositCategoryType.CRYPTO,
    categoryId: DepositCategoryId.CRYPTO,
    name: 'deposit.depositMethod.crypto',
    icon: 'cp',
    color: '#36A07B',
    active: true,
  },
}

export type PaymentMethodProps = {
  id: number
  type: string
  categoryId: number
  name: string
  icon: string
  color: string
  active: boolean
}

export const PaymentMethod: PaymentMethodProps[] = [
  PAYMENT_METHOD.LOCAL_BANK,
  PAYMENT_METHOD.ONLINE_BANK,
  PAYMENT_METHOD.MOMO,
  PAYMENT_METHOD.QR_CODE,
  PAYMENT_METHOD.TOP_UP,
  PAYMENT_METHOD.CRYPTO,
]

export enum ACTION_SHEET_ID {
  BASE = 'base',
  SQUARE = 'square',
  WITHDRAWAL = 'withdraw',
  WITHDRAWAL_CRYPTO = 'withdrawCrypto',
  AUTO_DEPOSIT = 'autoDeposit',
  LOCAL_BANK = 'localBank',
  ADD_BANK_ACCOUNT = 'addBankAccount',
  CHANNEL = 'channel',
  PROTOCOL = 'protocol',
}
