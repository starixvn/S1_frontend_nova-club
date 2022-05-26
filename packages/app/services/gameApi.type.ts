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
