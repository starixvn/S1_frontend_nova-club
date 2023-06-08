import { useAppSelector } from 'app/provider/redux/store'
import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { useLazyPlayerBalanceQuery } from 'services/walletApi'

export default function useAppState() {
  const appState = useRef(AppState.currentState)
  const currentToken = useRef<string>()
  const { token } = useAppSelector((state) => state.auth.info) || {}

  const [getPlayerBalance] = useLazyPlayerBalanceQuery()

  const _handleAppStateChange = async (nextAppState) => {
    try {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (currentToken.current) {
          getPlayerBalance()
        }
      }

      appState.current = nextAppState
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    currentToken.current = token
  }, [token])

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      _handleAppStateChange
    )

    return () => {
      if (appStateListener) {
        appStateListener.remove()
      }
    }
  }, [])

  return null
}
