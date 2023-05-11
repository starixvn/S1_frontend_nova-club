/**
 * *Player Balance
 */
export type PlayerBalanceArgs = {
  username: string
}

export interface PlayerBalanceData {
  balance: string
  reward: string
}

export interface PlayerBalanceMainBalance {
  main: PlayerBalanceData
}

export type PlayerBalanceResult = {
  [key: string]: PlayerBalanceData
} & PlayerBalanceMainBalance

/**
 * *Player Wallet
 */
export type PlayerWalletDetailArgs = {
  username: string
}

export type PlayerWalletDetailResult = {
  [index: string]: PlayerWalletDetail
}

export type PlayerWalletDetail = {
  maintenance: string
  seamless: number
  seq: number
  system_code: string
  system_name: string
  transfer_max_amount: string
  transfer_min_amount: string
}

/**
 * *Transfer
 */
export type TransferArgs = {
  amount: number
  transfer_from: number
  transfer_to: number
}

export type TransferResult = {
  url: string
}

/**
 * *Transfer All to One
 */
export type TransferAllToOneArgs = {
  transfer_from: number
  transfer_to: number
  username?: string
}

export type TransferAllToOneResult = {
  wallet: PlayerBalanceResult
}

/**
 * Transfer Member to member
 */

export type TransferMemberToMemberArgs = {
  amount: number
  to_invitation_code: string
  transfer_pin: string
  username?: string
}

export type TransferMemberToMemberResult = {
  wallet: PlayerBalanceResult
}
