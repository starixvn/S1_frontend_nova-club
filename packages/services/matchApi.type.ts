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
