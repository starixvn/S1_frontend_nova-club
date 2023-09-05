'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { AuthActions } from 'rewards/provider/redux/reducers/authReducer'
import { SettingActions } from 'rewards/provider/redux/reducers/settingReducer'
import { useAppDispatch } from 'rewards/provider/redux/store'
import {
  RewardGameKeyMap,
  RewardPostMessageType,
  iFrameRewardOrigin,
  type RewardPostMessagePayload,
} from 'utils/rewards'

const keyToGameRouteMap: Record<RewardGameKeyMap, string> = {
  [RewardGameKeyMap.ANGPAO_HUNT]: '/',
  [RewardGameKeyMap.FORTUNE_CAT]: '/fortune-cat',
  [RewardGameKeyMap.GOLDEN_CAT]: '/golden-cat',
  [RewardGameKeyMap.SPIN_N_WIN]: '/spin-and-win',
} as const

const Launcher = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()

  const handleGameRoute = useCallback(
    (event: MessageEvent<RewardPostMessagePayload>) => {
      if (
        event.origin !== iFrameRewardOrigin &&
        typeof window.ReactNativeWebView === 'undefined'
      ) {
        return
      }

      const data =
        typeof window.ReactNativeWebView === 'undefined'
          ? event.data
          : (JSON.parse(
              event.data as unknown as string
            ) as RewardPostMessagePayload)

      if (data.type === RewardPostMessageType.gameSecretKey) {
        const secretKey = data.payload.secretKey
        const gameRoute =
          keyToGameRouteMap[secretKey as keyof typeof keyToGameRouteMap]

        if (!gameRoute) {
          setError('The page you are trying to access appears to be missing')
          return
        }

        router.replace(gameRoute)

        dispatch(SettingActions.setLocale(data.payload.locale))

        if (data.payload.userAuthInfo) {
          dispatch(AuthActions.setAuthInfo(data.payload.userAuthInfo))
        }
      }
    },
    [dispatch, router]
  )

  useEffect(() => {
    /**
     * `useCapture` option need to be true due to for Android,
     * without capture mode, not able to receive the message payload
     * send from the Android device.
     *
     * See more: https://github.com/react-native-webview/react-native-webview/issues/356#issuecomment-1233173936
     */
    window.addEventListener('message', handleGameRoute, true)

    return () => {
      window.removeEventListener('message', handleGameRoute, true)
    }
  }, [handleGameRoute])

  if (error) {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
          textAlign: 'center',
          color: 'red',
          wordBreak: 'break-all',
        }}
      >
        {error}
      </div>
    )
  }

  return null
}

export default Launcher
