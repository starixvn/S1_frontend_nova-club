import { Currency } from 'app/utils/constant'
import { UserTotalDownline } from './userApi.type'
import { ShareholderStatusFilter } from 'agent/constant/select'

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
    [key in Currency]: NewEarnPercentagePercList
  }
  earnPerc: {
    [key in Currency]: number
  }
  cashDefault: string[]
  creditDEfault: string[]
  userCash: string[]
  userCredit: string[]
  currency: {
    [key in Currency]: string
  }
}

export interface NewEarnPercentagePercList {
  [key: number]: number
  55: number
  60: number
  65: number
  70: number
  75: number
  80: number
  85: number
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
    [key in Currency]: {
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
    [key in Currency]: {
      EARNP: string
    }
  }
}

export type ShareholderSetStatusArgs = {
  shareholder_id: string
  status: ShareholderStatusFilter
}

export type ShareholderBalanceArgs = {
  id: string
}

export type ShareholderBalanceResult = {
  wallet_bal_amt: {
    [key in Currency]: string
  }
}
