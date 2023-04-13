import { Currency } from 'app/utils/constant'

export type TransactionReportArgs = {
  start: number
  length: number
  date_from: string
  currency: Currency
  transaction_type: string
}

export type TransactionReportResult = {
  created_date: string
  transaction_type: string
  amount: string
}

export type ShareholderCommissionListArgs = {
  start: number
  length: number
  rpt_date: string
}

export type ShareholderCommissionListResult = {
  earning_amt: string
  rpt_date: string
  shareholding_perc: string
  turnover_amt: string
  username: string
  usertype: string
}

export type AgentCommissionListArgs = {
  start: number
  length: number
  rpt_date: string
}

export type AgentCommissionListResult = {
  earning_amt: string
  inhouse_bet_total_amt: string
  player_type: string
  player_username: string
  rpt_date: string
}
