interface Window {
  IGLOO: {
    getBlackbox: () => { blackbox: string }
  }
}

type Override<T1, T2> = Omit<T1, keyof T2> & T2

export interface GameConfig {
  gameName: string
  vi?: string
  providerCode: string
  gameCode: string
  new?: string
  hot?: string
}
