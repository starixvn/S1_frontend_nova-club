export type CreateTransferPinArgs = {
  pin: string
  cpin: string
}
export type UpdateTransferPinArgs = {
  old_pin: string
  pin: string
  cpin: string
}

export type RecoverPinArgs = {
  cpin: string
  pin: string
  verify_code: string
}
