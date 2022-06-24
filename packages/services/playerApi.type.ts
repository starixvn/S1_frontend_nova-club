import {
  ReportStatusDeposit,
  ReportStatusWithdrawal,
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
  status: ReportStatusDeposit | ReportStatusWithdrawal
  time_from: string
  time_to: string
  trans_type: ReportTransactionType
  username: string
}

export type ReportResult = {
  row_count_total: number
  rows: ReportItem[]
}

export type ReportItem = {
  amount: string
  date: string
  notes: string
  pay_bank: null
  pay_date: null
  player_notes: string
  secure_id: string
  status: string
  system_id: number
}
