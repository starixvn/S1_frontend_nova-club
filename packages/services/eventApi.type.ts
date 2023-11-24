import { Currency } from 'utils/constant'

export interface WcTicketCountResp {
  count: number
}

export type AffCup = {
  ticket_date: string
  username: string
}

export type AffCupWinnerList = {
  row_count_total: number
  rows: AffCup[]
}

export type CNYSpinBalance = {
  totalBalance: number
  totalSpin: number
  totalUsed: number
}

export type TicketSpinBalance = {
  totalBalance: number
  totalSpin: number
  totalUsed: number
}

export interface TicketSpinResult {
  code: string
  note: string
  amount: string
  formatted_amount: string
  err: string
}

export type MysteryEventResult = {
  currency: Currency
  name: string
  prize: MysteryEventPrize[]
}

export type MysteryEventPrize = {
  amt: string
  max: string
  min: string
}
