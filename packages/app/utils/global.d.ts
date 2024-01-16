interface Window {
  IGLOO: {
    getBlackbox: () => { blackbox: string }
  }
  ReactNativeWebView: object
  gameWindow: Window | null
}

type Override<T1, T2> = Omit<T1, keyof T2> & T2

type Tuple<
  T,
  N extends number,
  R extends readonly T[] = []
> = R['length'] extends N ? R : Tuple<T, N, readonly [T, ...R]>
