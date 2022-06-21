/**
 * *Deposit Payment List
 */
export type DepositPaymentListArgs = {
  username: string
}

export type DepositPaymentListResult = {}
/**
 * *Submit deposit
 */
export type SubmitDepositArgs = {
  amount: number
  bank_type_id: string
  card_code?: string
  card_seri?: string
  card_type?: string
  deposit_from: string
  username: string
}

export type SubmitDepositResult = {
  result: boolean
}

/**
 * *Submit manual deposit
 */
export type SubmitManualDepositArgs = {
  acc_name: string
  amount: number
  bank_type_id: number
  username: string
}

export type SubmitManualDepositResult = {
  result: boolean
}
