import {
  DepositPaymentMethodCategoryId,
  DepositPaymentMethodCategoryType,
} from 'app/utils/constant'

const enum PAYMENT_METHOD_CATEGORY {
  LOCAL_BANK,
  ONLINE_BANK,
  MOMO,
  QR_CODE,
  TOP_UP,
  CRYPTO,
}

export enum DepositMethodId {
  LOCAL_BANK = 1,
  ONLINE_BANK = 2,
  MOMO = 3,
  QR_CODE = 4,
  TOP_UP = 5,
  CRYPTO = 6,
}

export const PAYMENT_METHOD: { [key in keyof typeof PAYMENT_METHOD_CATEGORY] } =
  {
    LOCAL_BANK: {
      id: DepositMethodId.LOCAL_BANK,
      type: DepositPaymentMethodCategoryType.LOCAL_BANK,
      categoryId: DepositPaymentMethodCategoryId.LOCAL_BANK,
      name: 'deposit.depositMethod.bankTransfer',
      icon: 'lba',
      color: '#ac0102',
      active: true,
    },
    ONLINE_BANK: {
      id: DepositMethodId.ONLINE_BANK,
      type: DepositPaymentMethodCategoryType.ONLINE_BANK,
      categoryId: DepositPaymentMethodCategoryId.ONLINE_BANK,
      name: 'deposit.depositMethod.onlineBanking',
      icon: 'mac',
      color: '#f56e04',
      active: true,
    },
    MOMO: {
      id: DepositMethodId.MOMO,
      type: DepositPaymentMethodCategoryType.MOMO,
      categoryId: DepositPaymentMethodCategoryId.MOMO,
      name: 'deposit.depositMethod.momo',
      icon: 'momo',
      color: '#AC016C',
      active: true,
    },
    QR_CODE: {
      id: DepositMethodId.QR_CODE,
      type: DepositPaymentMethodCategoryType.QR_CODE,
      categoryId: DepositPaymentMethodCategoryId.QR_CODE,
      name: 'deposit.depositMethod.qrCode',
      icon: 'qr',
      color: '#44BAF9',
      active: true,
    },
    TOP_UP: {
      id: DepositMethodId.TOP_UP,
      type: DepositPaymentMethodCategoryType.TOP_UP,
      categoryId: DepositPaymentMethodCategoryId.TOP_UP,
      name: 'deposit.depositMethod.topUp',
      icon: 'card',
      color: '#95AC00',
      active: true,
    },
    CRYPTO: {
      id: DepositMethodId.CRYPTO,
      type: DepositPaymentMethodCategoryType.CRYPTO,
      categoryId: DepositPaymentMethodCategoryId.CRYPTO,
      name: 'deposit.depositMethod.crypto',
      icon: 'cp',
      color: '#36A07B',
      active: false,
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

export const getPaymentMethodLogo = (bankCode: string) => {
  const logo = PaymentMethod.find((el) => el.bank_code === bankCode)?.image

  return logo ?? require('../../assets/images/home/fishing.jpg')
}

export default PaymentMethod
