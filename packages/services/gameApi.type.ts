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

export interface GetGameListByTagsArgs {
  tags: string[]
  limit?: number
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
  xImg?: string
  name: Record<LANGUAGE_CODE, string>
  tags: string[]
  gdc_cat?: GDC_GAME_CATEGORY
  params?: Record<string, string>
}

export type FeaturedGame = Omit<Game, 'gdc_cat' | 'params'> & {
  cat: '1' | '2'
}

export interface GameListDefaultData<T> {
  rows: T[]
  row_count_total: number
}

export interface GetGameListResult {
  rows: Game[]
  row_count_total: number
}

export interface GetFeaturedGameListResult {
  rows: FeaturedGame[]
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

export interface ProviderStatus {
  maintenance: boolean
  seamless: number
  seq: number
  system_code: string
  system_name: string
}

export interface GameCategoryTagTypes {
  gtc: string
  ck: string
  category_name: Record<LANGUAGE_CODE, string>
}

export interface GameCategoryTagResult
  extends GameListDefaultData<GameCategoryTagTypes> {}
