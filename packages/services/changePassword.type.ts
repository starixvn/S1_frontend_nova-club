export type ChangePasswordResult = string

export type ChangePasswordArgs = {
  username?: string
  old_password: string
  password: string
  cpassword: string
}
