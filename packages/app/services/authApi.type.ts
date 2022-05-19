export interface LoginQueryArgs {
  username: string
  password: string
}

export interface LoginResult {
  playerId: string
  playerName: string
  token: string
}

export interface RegisterInvalidResult {
  field: string
  message: string
}

export type RegisterResult = LoginResult | RegisterInvalidResult[]

export interface RegisterQueryArgs {
  contactNumber: string
  cpassword: string
  email: string
  password: string
  terms: true
  tracking_code: string
  username: string
}
