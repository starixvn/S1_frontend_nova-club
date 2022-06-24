/**
 * *Player Balance
 */
export type PlayerBalanceArgs = {
  username: string
}

export type PlayerBalanceResult = {
  main: {
    balance: string
    reward: string
  }
}

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
  game_code: string
  is_demo: number
  is_mobile: number
  platform_code: string
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
