import { Currency } from 'utils/constant'

export interface WithdrawalListInfo {
  draw: number
  data: WithdrawalItem[]
}

export interface WithdrawalItem {
  amount: number
  status: string
  created_at: string
}

export interface WithdrawalListArgs {
  start: number
  length: number
  currency: string
  date_from: string
}

export interface WithdrawalSubmitFormArgs {
  currency: Currency
  bank_card: string
  account_number: string
  account_name: string
  amount: string
}

export interface WithdrawalSubmissionInfo {
  withdrawal_Id: number
}

export interface NettPayout {
  value: number
}
export interface NettPayoutArgs {
  currency: Currency
  amount: number
}
