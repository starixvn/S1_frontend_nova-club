export interface BannerResult {
  image: string
  // bannerName: string
  // bannerLink: string
  // bannerType: number
  // bannerPCUrl: string
  // bannerMobileUrl: string
}

export interface LeaderboardResult {
  custId: number
  date: string
  username: string
  wTurnover: number
}

export interface CommissionTableResult {
  system_code: string
  system_name: string
  game_type_code: string
  game_type: string
  is_game_provider: boolean
  currency: string
  cash_player: number
  cash_player_referrer: number
  credit_player: number
  order: number
}

export interface CommissionQueryArgs {
  currency: string
}

export interface AnnouncementResult {
  list: AnnouncementListItems[]
}

export interface AnnouncementListItems {
  subject: any
  id: any
  content: string
  date: object
  end_date: object
  newsId: number
  start_date: object
  title: string
}
