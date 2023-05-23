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
