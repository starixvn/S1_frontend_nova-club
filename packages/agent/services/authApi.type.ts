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
