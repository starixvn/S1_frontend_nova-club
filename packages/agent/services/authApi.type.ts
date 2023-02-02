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
