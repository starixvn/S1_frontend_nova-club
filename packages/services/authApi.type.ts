import { Currency } from 'utils/constant'

export enum Shield_Platform {
  WEB = 'WEB',
  APP = 'APP',
}

export enum Shield_Action {
  LOGIN = 'login',
  REGISTER = 'register',
  WITHDRAWAL = 'withdrawal',
  NONE = '',
}
export interface LoginQueryArgs {
  username: string
  password: string
}

export interface LoginResult {
  // playerId: string
  playerName: string
  token: string
  note?: string
  currency: Currency
}

export interface RegisterInvalidResult {
  field: string
  message: string
}

export type WheelInfo = {
  totalBalance: number
  totalSpin: number
  totalUsed: number
}

export type RegisterResult =
  | (LoginResult & { wheel_info: WheelInfo })
  | RegisterInvalidResult[]

export interface RegisterQueryArgs {
  contactNumber: string
  cpassword: string
  device_os: string
  password: string
  currency: Currency
  registered_by: string
  terms: boolean
  tracking_code?: string
  username: string
  verify_code: string
  platform_uuid: string
  agent_currency?: string
  agent_token?: string
}

export type LogoutQueryArgs = Pick<LoginQueryArgs, 'username'>

export type CheckUsernameQueryArgs = Pick<LoginQueryArgs, 'username'>

export interface RegisterOtpQueryArgs {
  contactNumber: string
  username: string
  currency: string
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

export interface UpdateShieldQueryArgs {
  action_type: Shield_Action
  platform: Shield_Platform
  session_id: string
}
