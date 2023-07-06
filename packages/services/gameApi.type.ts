import {
  GAME_TYPE_CODE,
  GDC_GAME_CATEGORY,
  LANGUAGE_CODE,
} from 'app/utils/constant'
import { ImageSourcePropType } from 'react-native'

export interface GetGameUrlQueryArgs {
  game_code?: string
  is_demo: number
  is_mobile: number
  platform_code?: string
  token?: string
  username?: string
  home_url?: string
  cashier_url?: string
}

export interface GetGameUrlResult {
  url: string
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
  imgX: string
  name: Record<LANGUAGE_CODE, string>
  tags: string[]
  gdc_cat?: GDC_GAME_CATEGORY
  params?: Record<string, string>
}

export interface GetGameListResult {
  rows: Game[]
  row_count_total: number
}

export interface GameScreenMultipleRequest {
  game_category?: GAME_TYPE_CODE[]
  gdc_game_category?: GDC_GAME_CATEGORY[]
}

export enum LatestWinnerType {
  Slot = 'slot',
  Games = 'games',
}

export interface LatestWinner {
  game: Game
  username: string
  amount: number
}
