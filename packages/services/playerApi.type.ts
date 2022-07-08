import {
  ReportDepositStatus,
  ReportWithdrawalStatus,
  ReportTransactionType,
} from 'app/utils/constant'

export interface ProfileResult {
  auto_transfer_status: number
  birthdate: string
  contractNumber: string
  crypto_withdrawal: boolean
  currency: string
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

/**
 * *Player Overview
 */
export type OverviewArgs = {
  username: string
}

export type OverviewResult = {
  self_winloss: string
  self_turnover: string
  self_realbet: string
  circle_winloss: string
  circle_turnover: string
  circle_realbet: string
  circle_direct: number
}

/**
 * *Player Report
 */
export type ReportArgs = {
  limit: number
  offset: number
  status: ReportDepositStatus | ReportWithdrawalStatus
  game_provider_code?: string
  time_from: string
  time_to: string
  trans_type: ReportTransactionType
  username?: string
}

export type ReportResult = {
  row_count_total: number
  rows: ReportTransactionItem[] | ReportGameItem[]
}

export type ReportTransactionItem = {
  amount: string
  date: string
  pay_bank: null
  pay_date: null
  secure_id: string
  status: string
  system_id: number
}

export type ReportGameItem = {
  bet: string
  date: string
  game_provider_code: string
  game_type_code: string
  loss: string
  win: string
  winloss: string
}

/**
 * Player Update Language
 */

export type PlayerLangArgs = {
  lang: string
}

export interface PlayerOverviewArgs {
  date_from: string
  date_to: string
}
