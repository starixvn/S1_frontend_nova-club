export interface LoginQueryArgs {
  username: string
  password: string
}

export interface LoginResult {
  // playerId: string
  playerName: string
  token: string
  note?: string
}

export interface RegisterInvalidResult {
  field: string
  message: string
}

export type RegisterResult = LoginResult | RegisterInvalidResult[]

export interface RegisterQueryArgs {
  contactNumber: string
  cpassword: string
  password: string
  terms: boolean
  tracking_code?: string
  username: string
  verify_code: string
  platform_uuid: string
}

export type LogoutQueryArgs = Pick<LoginQueryArgs, 'username'>

export type CheckUsernameQueryArgs = Pick<LoginQueryArgs, 'username'>

export interface RegisterOtpQueryArgs {
  contactNumber: string
  username: string
}

export interface ForgotPasswordOtpQueryArgs {
  contactNumber: string
}

export interface PasswordRecoveryQeuryArgs {
  contactNumber: string
  cpassword: string
  password: string
  verify_code: string
}
