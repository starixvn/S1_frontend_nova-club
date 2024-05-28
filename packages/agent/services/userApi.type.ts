import { Currency } from 'utils/constant'

export interface UserInfo {
  allWallet: { [key in Currency]?: number }
  has_logged_in: 0 | 1
  has_otp: 0 | 1
  has_pin: 0 | 1
  has_verified_wd: 0 | 1
  id: number
  mobile_no: string
  name: string
  role: (string & {}) | 'shareholder' | 'agent'
  username: string
  wallet: WalletBalance
}

export interface WalletBalance {
  currency: Currency
  balance: number
}

export interface RefreshBalance {
  balance: {
    [key in Currency]: number
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

export interface ResetPasswordArgs {
  password: string
  confirmpassword: string
  mobile_no: string
  OTP: string
}

export interface SendOtpArgs {
  mobile_no: string
}

export interface ChangePasswordArgs {
  oldPwd: string
  password: string
  confirmpassword: string
}
