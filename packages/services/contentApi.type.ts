import { LANGUAGE_CODE } from 'app/constant/language'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { ImageSourcePropType } from 'react-native'

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
}

export interface Game {
  gc: string
  gpc: string
  gtc: GAME_TYPE_CODE
  img: string
  name: Record<LANGUAGE_CODE, string> | string
  tags: string[]
}

export interface GetGameListResult {
  rows: Game[]
  row_count_total: number
}

export interface JackpotAmountResult {
  increment: string
  jackpotAmount: string
}
