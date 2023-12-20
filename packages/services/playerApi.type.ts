import {
  CoinRedemptionType,
  ReportDepositStatus,
  ReportTransactionType,
  ReportWithdrawalStatus,
} from 'utils/constant'
import { WheelInfo } from './authApi.type'

export enum MEMBER_TYPE {
  CASH = 'CASH',
  CREDIT = 'CREDIT',
}

export enum WITHDRAWAL_TYPE {
  ALL = 0,
  BANK = 1,
  CRYPTO = 2,
}
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
  pin_exist: boolean
  player_id: number
  referral_code: string
  username: string
  vip_group: string
  vip_level: string
  vip_level_display: string
  verified_phone: number
  member_type: MEMBER_TYPE
  telegram_id: string
}

export interface ProfileQueryArgs {
  username: string
}

export interface ProfileUpdateArgs {
  field: string
  value: string
  verify_code: string
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

export type OverviewSummaryResult = {
  accumulate_reward: string
  active_player: number
  registered: number
  ref_comm: string
}

/**
 * *Player Report
 */
export type ReportArgs = {
  bank_category_id?: number
  is_reward_group_by?: boolean
  limit: number
  offset: number
  status: ReportDepositStatus | ReportWithdrawalStatus
  coin_redemption_type?: CoinRedemptionType
  game_provider_code?: string
  time_from: string
  time_to: string
  trans_type: ReportTransactionType
  username?: string
}

export type ReportResult = {
  row_count_total: number
  rows: ReportItemTypes
}

export type ReportItemTypes =
  | ReportDepositItem[]
  | ReportWithdrawalItem[]
  | ReportRewardItem[]
  | ReportGameItem[]
  | ReportCoinItem[]

export interface ReportDepositItem {
  amount: string
  bank_slip_attachment: boolean
  date: string
  notes: string
  pay_bank: string // TODO: verify is it string type
  pay_date: string
  pay_type: string
  player_notes: string
  second_category_flag: number
  secure_id: string
  status: string
  system_id: number
}

export interface ReportWithdrawalItem {
  amount: number
  can_cancel_withdrawal: boolean
  date: string
  net_withdraw: number
  notes: string
  status: string
  tx_code: string
  withdraw_charge_fee: number
  withdraw_charge_percentage: number
}

export interface ReportRewardItem {
  amount: number
  date: string
  gp: string
  gt: string
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

export type ReportCoinItem = {
  amount: number
  date: string
  eventName: string
  transactionType: string
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

/**
 * Lucky spin
 */

export type LuckySpinArgs = {
  code: number
  note: string
}

export type FreeSpinArgs = {
  username: string
}

export type FreeSpinResult = {
  playerName: string
  wheel_info: WheelInfo
}

export type PlayerRealNameArgs = {
  realName: string
  dob: string
  telegram_id: string
}

export type EligibleSpinResult = {
  details: EligibleSpinItem[]
}

export type EligibleSpinItem = {
  event_code: string
  event_type: 'registration' | 'retention'
  wheel_info: WheelInfo
}
