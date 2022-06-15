export interface GameQueryArgs {
  platform: string
  type: string
}

export interface GameListResult {
  code: string
  demo: boolean
  image: string
  name: {
    cn: string
    en: string
  }
  pid: string
  tags: string[]
}

export interface GetGameUrlQueryArgs {
  game_code: string
  is_demo: number
  is_mobile: number
  platform_code: string
  username: string
}

export interface GetGameUrlResult {
  url: string
}
