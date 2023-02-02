import { Currency } from 'app/utils/constant'
import { UserTotalDownline } from './userApi.type'

export interface AgentProfile {
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

export interface AgentTotalDownline {
  total_member_cnt: string
  direct_member_cnt: string
}

export type AgentListArgs = {
  start: number
  length: number
  created_at?: string
  username?: string
  active?: string
}

export type AgentListResult = {
  id: string
  username: string
  created_at: string
  active: string
}

//Agent Details
export type AgentDetailsArgs = {
  id: string
}

export type AgentDetailsResult = {
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

export interface AgentResetPinArgs {
  OTP_1: string
  new_pin: string
  confirm_pin: string
}

export type AddNewAgentArgs = {
  currency: {
    [Currency.VND]: {
      CASH: string
      CREDIT: string
    }
  }
  username: string
  password: string
  confirmpassword: string
}

export type AddNewAgentResult = {
  password: string
  username: string
}

// Member List
export type MemberListArgs = {
  start: number
  length: number
  currency: Currency
  registerdate_start?: string
  username?: string
  status?: string
}

export type MemberListResult = {
  player_id: string
  username: string
  register_date: string
  status: string
}
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

export interface AgentCreatePinArgs {
  OTP_1: string
  new_pin: string
  confirm_pin: string
}

export interface AgentCreatePinResult {
  key: number
}

export interface AgentVerifyTransferPinArgs {
  pin: string
}

export interface AgentVerifyTransferPinResult {
  key: number
}

export interface AgentRecentTransactionListArgs {
  start: number
  length: number
  date_from: string
  currency: string
}
export interface AgentRecentTransactionListResult {
  currency: string
  reference_id: string
  amount: string
  created_date: string
}

export interface AgentReferralDetailsArgs {
  agentId: string
}

export interface AgentReferralDetailsResult {
  domain: string
  username: string
  can_cash: string
  qrcode: AgentQr
}

export interface AgentQr {
  VND: AgentQrDetails
}

export interface AgentQrDetails {
  code: string
  domain: string
  agent_type: string
}
