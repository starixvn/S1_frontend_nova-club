import { BannerAction } from 'app/utils/carouselBannerActionGenerator'
import { Currency } from 'utils/constant'

// export interface BannerResult {
//   image: string
//   blurDataURL?: string // base64 of 10px width banner image
//   blurHash?: string // https://blurha.sh/
//   action?: BannerAction
//   guestAction?: BannerAction
//   alt?: string
//   // bannerName: string
//   // bannerLink: string
//   // bannerType: number
//   // bannerPCUrl: string
//   // bannerMobileUrl: string
// }

export interface BannerResult {
  row_count_total: number
  rows: BannerItem[]
}
export interface BannerItem {
  banner_display_page: BannerPage
  banner_image: string
  banner_name: string
  banner_seq: number
  banner_url: string
  banner_url_redirection: 'ext' | 'int'
}

export enum BannerPage {
  Main = 'main',
  Slot = 'slots',
  LocalGame = 'local_game',
  LiveCasino = 'live_casino',
  Popup = 'popup',
}
export interface LeaderboardResult {
  custId: number
  date: string
  username: string
  wTurnover: number
}

export interface CommissionTableResult {
  cash_player: number
  cash_player_referrer: number
  cash_agent: number
  currency: string
  game_type: string
  game_type_code: string
  is_game_provider: boolean
  is_game_type: boolean
  is_master: boolean
  seq: number
  system_code: string
  system_name: string
}

export interface CurrencyArgument {
  currency: Currency
}

export interface CommissionQueryArgs {
  currency: string
}

export interface AffiliateUsernameArgs extends CurrencyArgument {
  trackingCode: string
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

export interface JackpotAmountResult {
  increment: string
  jackpotAmount: string
}

export interface LeaderboardRankingResult {
  row_count_total: number
  rows: RankingItem[]
}

export type RankingItem = {
  rank: number
  username: string
  points: string
  status: string
}
