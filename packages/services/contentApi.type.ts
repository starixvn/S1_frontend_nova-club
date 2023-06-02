import { LANGUAGE_CODE } from 'app/constant/language'
import { Action } from 'app/utils/actionGenerator'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { ImageSourcePropType } from 'react-native'

export interface BannerResult {
  image: string
  action?: Action
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
  cash_agent: number
  cash_player: number
  cash_player_referrer: number
  credit_player: number
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

export interface CommissionQueryArgs {
  currency: string
}

export enum GameCategory {
  Slot = 'slots',
  Fishing = 'fishing',
  LiveCasino = 'live_dealer',
}
export interface GameListQueryArgs {
  currency: string
  game_category: GameCategory
}

export interface GameConfig {
  game_code: string
  game_name: string
  game_provider_code: string
  game_type_code: string
  image?: ImageSourcePropType
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

export interface GetGameListQueryArgs {
  currency: string
  game_category: string[]
  limit: number
  offset: number
  gdc_game_category?: string[]
  gdc_tag?: string[]
}

export interface Game {
  gc: string
  gpc: string
  gtc: GAME_TYPE_CODE
  img: string
  name: Record<LANGUAGE_CODE, string> | string
  tags: string[]
  gdc_cat?: string
  params?: Record<string, string>
}

export interface GetGameListResult {
  rows: Game[]
  row_count_total: number
}

export interface JackpotAmountResult {
  increment: string
  jackpotAmount: string
}

export interface MatchResult {
  AwayKey: number
  AwayLang: string
  AwayName: string
  EventId: number
  HomeKey: number
  HomeLang: string
  HomeName: string
  LeagueId: number
  LeagueLang: string
  LeagueName: string
  MarketType: string
  SportID: number
  globalshowtime: string
  selection: MatchOdd[]
}

export interface MatchOdd {
  Key: string
  KeyName: string
  Point: number
  Point2: string
  Price: number
}
