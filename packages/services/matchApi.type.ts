export interface Match {
  id: number
  venue: string
  location: string
  status: string
  weather: {
    humidity: null
    temp_celsius: null
    temp_farenheit: null
    wind_speed: null
    description: null
  }
  attendance: null
  officials: []
  stage_name: string
  home_team_country: string
  away_team_country: string
  datetime: string
  winner: null
  winner_code: null
  home_team: { country: string; name: string; goals: null; penalties: null }
  away_team: { country: string; name: string; goals: null; penalties: null }
  last_checked_at: string
  last_changed_at: string
}
