export interface GetGameUrlQueryArgs {
  game_code?: string
  is_demo: number
  is_mobile: number
  platform_code?: string
  home_url?: string
}

export interface GetGameUrlResult {
  url: string
}
