export type SubmitWithdrawalArgs = {
  amount: number
  bank_details_id: number
  username?: string
}

export type CryptoExchangeRateArgs = {
  from_currency: string
  to_currency: string
  type: string
  Amount: string
}

export type CryptoExchangeRateResult = {
  converted_amount: string
  currency: string
  success: boolean
}

export type AvailableWithdrawalAmountResult = {
  balance: string
  current: string
  max: string
  max_withdrawal_per_trans: string
  min_withdrawal_per_trans: string
}
