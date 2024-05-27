export type EuroCupEvent = {
  event_code: string
  event_name: string
  event_team: EventTeam[]
  prediction_end: string
  prediction_start: string
  stage: string
}

export type EventTeam = {
  event_code: string
  is_winner: number
  team_code: string
  team_image: string
  team_name: string
}

export type EligibleEuroCupTicketArgs = {
  event_code: string
}
export type EligibleEuroCupTicketResult = {
  winning_ticket: number
  eligible_ticket: number
  eligible_for_score: number
}

export type SubmitEuroCupTicketArgs = {
  event_code: string
  teams: string[]
  scores?: { [key: string]: number }
}
export type SubmitEuroCupTicketResult = {}

export type EventEuroCupLogServiceResult = {
  type: string
  detail: string
  created_at: string
}

export type LogPrediction = {
  scores: { [key: string]: string }
  teams: string[]
}

export type LogWinning = {
  event_code: string
  event_name: string
  ticket: number
}

export type GetSubmittedTeamResult = {
  submitted_team_code: string[]
  teams: {
    [key: string]: number
  }
}

export type GetSubmittedTeamArgs = {
  event_code: string
}

export type GetEuroCupKnockoutResult = {}

export type EuroCupKnockout = {
  event_group: string
  event_name: string
  position: string
  team_code: string
  team_img: string
}
