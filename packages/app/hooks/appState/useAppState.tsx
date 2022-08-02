import { useAppSelector } from 'app/provider/redux/store'
import { useEffect, useRef } from 'react'
import { AppState, NativeEventSubscription } from 'react-native'
import { useLazyPlayerBalanceQuery } from 'services/walletApi'

export default function useAppState() {
  const appState = useRef(AppState.currentState)
  const appStateInstance = useRef<NativeEventSubscription>()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const [getPlayerBalance] = useLazyPlayerBalanceQuery()

  const _handleAppStateChange = async (nextAppState) => {
    try {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (token) {
          getPlayerBalance()
        }
      }

      appState.current = nextAppState
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      _handleAppStateChange
    )
    appStateInstance.current = appStateListener

    return () => {
      appStateInstance.current?.remove()
    }
  }, [])

  return null
}
