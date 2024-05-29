import { Currency } from 'utils/constant'
import { AgentQr } from './agentApi.type'

export interface ProfileQrArgs {
  agentId: string
}

export interface ProfileQrResult {
  domain: string
  username: string
  can_cash: string
  qrcode: AgentQr
}

export interface ProfileDetailArgs {
  id?: string
}

export type ProfileDetailResult = {
  id: number
  name: string
  username: string
  currency: Currency
  lastlogin_at: string
  lastlogin_ip: string
  total_downline: {
    total_member_cnt: string
    direct_member_cnt: string
    shareholder_cnt: string
    shareholder_total_cnt: string
  }
  earning_perc: {
    VND: string
  }
  created_at: string
  email: string
  mobile_no: string
}

export type ProfileBalanceArgs = {
  id: string
}

export type ProfileBalanceResult = {
  wallet_bal_amt: {
    [key in Currency]: string
  }
}

export interface PartnerCreatePinArgs {
  OTP_1: string
  new_pin: string
  confirm_pin: string
}

export interface PartnerCreatePinResult {
  key: number
}

export interface PartnerVerifyTransferPinArgs {
  pin: string
}

export interface PartnerVerifyTransferPinResult {
  key: number
}

export interface PartnerResetPinArgs {
  OTP_1: string
  new_pin: string
  confirm_pin: string
}

export type ProfileGetEarnPtArgs = {
  shid: string
}
export type ProfileGetEarnPtResult = {
  earnPercList: { [key in Currency]?: number }
}

export type ProfileUpdatePtArgs = {
  shid: string
  currency: {
    [key in Currency]?: {
      EARNP: string
    }
  }
}
