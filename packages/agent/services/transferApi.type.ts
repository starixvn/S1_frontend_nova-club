import { ROLE } from 'agent/utils/helper'
import { Currency } from 'utils/constant'

export interface TransferListArgs {
  start: number
  length: number
  date_from: string
  currency: string
}

export interface TransferListItemResult {
  currency: string
  referrer_code: string
  amount: string
  created_date: string
}

export interface NewTransferResult {
  code: number
  message: string
  data?: {
    request_secure_id: string
  }
  success: boolean
}

export interface NewTransferArgs {
  memberCode: string
  currency: Currency
  balance_transfer: string
  remark: string
  referrer_code?: string
}

export interface ChangeReferralResult {
  value: string
  currency: string
  balance: number
  currency_postfix?: string
  message?: string
}

export interface ChangeReferralArgs {
  referralCode: string
  role: ROLE
}

export type ProfileChangeReferralResult = {
  value: string
  currency: string
  balance: number
  currency_postfix?: string
  message?: string
}

export type ProfileChangeReferralArgs = {
  referralCode: string
}
