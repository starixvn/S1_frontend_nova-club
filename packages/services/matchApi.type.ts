export interface MatchResult {
  HomeImagePath: string
  AwayImagePath: string
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
  [key: string]: {
    Key: string
    KeyName: string
    Point: number
    Point2: string
    Price: number
  }
}

export type League = MatchResult[]
