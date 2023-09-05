import { RowData } from './common/types'

export interface RedemptionResult {
  code: string
  note: string
  amount: string
  formatted_amount: string
  err: string
}

export interface CoinRedemptionRow {
  cost: number
  game_type: string
  key: string
  name: string
  seq: number
}

export interface DailyCoinSettingResult {
  // event_name: string
  daily_setting: Coin[]
  current_daily_setting: string
  day: number
  checked_in: boolean
}

export interface Coin {
  coin: string
}

export type CoinRedemptionList = RowData<CoinRedemptionRow>
