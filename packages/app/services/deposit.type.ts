/**
 * *Submit deposit
 */
export type SubmitDepositArgs = {
  amount: number
  bank_type_id: number
  card_code: number
  card_seri: number
  card_type: string
  deposit_from: number
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
