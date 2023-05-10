import { Currency } from 'app/utils/constant'

export interface LoginQueryArgs {
  username: string
  password: string
}
export interface LoginResult {
  success: boolean
  message?: string
  access_token?: string
  token_type?: string
}

export type AgentCheckUsername = {
  username: string
}

export type RegisterArgs = {
  currency: {
    [key in Currency]: {
      CASH: string
      CREDIT: string
    }
  }
  username: string
  password: string
  confirmpassword: string
  referral_code: String
  mobile_no: string
  OTP: string
}

export type AgentRegisterResult = {
  access_token: string
  token_type: string
}

export type ResetPwSendOtpArgs = {
  mobile_no: string
  username: string
}

export type ResetPwArgs = {
  username: string
  mobile_no: string
  OTP: string
  password: string
  confirmpassword: string
}
