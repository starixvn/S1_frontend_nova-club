import { Currency } from 'app/utils/constant'
import { UserTotalDownline } from './userApi.type'

export interface ShareholderListArgs {
  start: number
  length: number
  created_at?: string
  username?: string
  active?: string
}

export interface ShareholderListResult {
  id: string
  username: string
  active: string
  earning_perc: string
  created_at: string
}

export interface NewEarnPercentage {
  earnPercList: {
    VND: {
      55: number
      60: number
      65: number
      70: number
      75: number
    }
  }
  earnPerc: {
    VND: number
  }
  cashDefault: string[]
  creditDEfault: string[]
  userCash: string[]
  userCredit: string[]
  currency: {
    VND: string
  }
}

export interface ShareholderProfile {
  username: string
  name: string
  currency: string
  mobile_no: string
  email: string
  created_at: string
  lastlogin_at: string
  lastlogin_ip: string
  total_downline: UserTotalDownline
  has_logged_in: number
  has_pin: number
}

export interface ShareholderTotalDownline {
  total_member_cnt: string
  direct_member_cnt: string
  shareholder_cnt: string
  shareholder_total_cnt: string
  Shareholder_cnt: string
  Shareholder_total_cnt: string
}

export interface ShareholderDetailsArgs {
  id: string
}

export interface ShareholderDetailsResult {
  id: string
  username: string
  name: string
  currency: string
  mobile_no: string
  email: string
  created_at: string
  lastlogin_at: string
  lastlogin_ip: string
  total_downline: UserTotalDownline
}

export interface ShareholderResetPinArgs {
  OTP_1: string
  new_pin: string
  confirm_pin: string
}

export type AddNewShareholderArgs = {
  currency: {
    [Currency.VND]: {
      EARNP: string
      CASH: string
      CREDIT: string
    }
  }
  username: string
  password: string
  confirmpassword: string
}

export type AddNewShareholderResult = {
  password: string
  username: string
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

export interface ShareholderCreatePinArgs {
  OTP_1: string
  new_pin: string
  confirm_pin: string
}

export interface ShareholderCreatePinResult {
  key: number
}

export interface ShareholderVerifyTransferPinArgs {
  pin: string
}

export interface ShareholderVerifyTransferPinResult {
  key: number
}

export interface ShareholderRecentTransactionListArgs {
  start: number
  length: number
  date_from: string
  currency: string
}
export interface ShareholderRecentTransactionListResult {
  currency: string
  referrer_code: string
  amount: string
  created_date: string
}

export type ShareholderGetEarnPtArgs = {
  id: string
}
export type ShareholderGetEarnPtResult = {
  earnPercList: object
}

export type ShareholderUpdatePtArgs = {
  id: string
  currency: {
    [Currency.VND]: {
      EARNP: string
    }
  }
}
