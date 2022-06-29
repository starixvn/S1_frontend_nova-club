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
  result: string
}

/**
 * *Transfer
 */
export type TransferArgs = {
  amount: number
  transfer_from: number
  transfer_to: number
  username?: string
}

export type TransferResult = {
  url: string
}

/**
 * *Transfer All to One
 */
export type TransferAllToOneArgs = {
  game_code: string
  is_demo: number
  is_mobile: number
  platform_code: string
  username?: string
}

export type TransferAllToOneResult = {
  url: string
}
