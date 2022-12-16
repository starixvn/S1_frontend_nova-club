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
