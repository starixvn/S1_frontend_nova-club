import { Currency } from 'app/utils/constant'

export interface UserInfo {
  id: number
  username: string
  name: string
  role: (string & {}) | 'shareholder' | 'agent'
  wallet: WalletBalance
  mobile_no: string
  has_logged_in: number
  has_pin: number
  has_verified_wd: number
}

export interface WalletBalance {
  currency: string
  balance: number
}

export interface RefreshBalance {
  balance: {
    VND: number
  }
}

export interface UserCommissionListResult {
  gametype: string
  cashagent: string
  cashplayer: string
  cashreferralplayer: string
}

export interface UserCommissionListArgs {
  currency: Currency
}

export interface UserProfile {
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

export interface UserTotalDownline {
  total_member_cnt: string
  direct_member_cnt: string
  shareholder_cnt?: string
  shareholder_total_cnt?: string
  agent_cnt?: string
  agent_total_cnt?: string
}

export interface ResetPinOtpArgs {
  mobile_no: string
}

export interface CreatePinOtpArgs {
  mobile_no: string
}

export interface ChangePasswordArgs {
  password: string
  confirmpassword: string
  mobile_no: string
  OTP: string
}

export interface SendOtpArgs {
  mobile_no: string
}
