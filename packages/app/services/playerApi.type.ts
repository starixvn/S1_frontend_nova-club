export interface ProfileResult {
  auto_transfer_status: number
  birthdate: string
  contractNumber: string
  crypto_withdrawal: boolean
  email: string
  firstName: string
  gender: string
  global_auto_transfer_status: string
  language: string
  lastName: string
  player_id: number
  referral_code: string
  username: string
  vip_group: string
  vip_level: string
  vip_level_display: string
}

export interface ProfileQueryArgs {
  username: string
}
