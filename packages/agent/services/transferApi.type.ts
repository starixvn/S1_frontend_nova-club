import { ROLE } from 'agent/utils/helper'
import { Currency } from 'app/utils/constant'

export interface TransferListArgs {
  start: number
  length: number
  date_from: string
  currency: string
  role: ROLE
}

export interface TransferListItemResult {
  currency: string
  reference_id: string
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
  role: ROLE
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

// Agent Transfer List
export interface AgentTransferListArgs {
  start: number
  length: number
  date_from: string
  currency: string
}
export interface AgentTransferListResult {
  currency: string
  referrer_code: string
  amount: string
  created_date: string
}

// New Agent Transfer

export interface AgentNewTransferResult {
  code: number
  message: string
  data?: {
    request_secure_id: string
  }
  success: boolean
}

export interface AgentNewTransferArgs {
  memberCode: string
  currency: Currency
  balance_transfer: string
  remark: string
  referrer_code?: string // for manual cache update
}

export interface AgentChangeReferralResult {
  value: string
  currency: string
  balance: number
  currency_postfix?: string
  message?: string
}

export interface AgentChangeReferralArgs {
  referralCode: string
}

// Sharehoder Transfer List
export interface ShareholderTransferListArgs {
  start: number
  length: number
  date_from: string
  currency: string
}
export interface ShareholderTransferListResult {
  currency: string
  referrer_code: string
  amount: string
  created_date: string
}

export interface ShareholderNewTransferResult {
  code: number
  message: string
  data?: {
    request_secure_id: string
  }
  success: boolean
}

export interface ShareholderNewTransferArgs {
  memberCode: string
  currency: Currency
  balance_transfer: string
  remark: string
  referrer_code?: string // for manual cache update
}

export interface ShareholderChangeReferralResult {
  value: string
  currency: string
  balance: number
  currency_postfix?: string
  message?: string
}

export interface ShareholderChangeReferralArgs {
  referralCode: string
}
