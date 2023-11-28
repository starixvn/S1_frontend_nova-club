import { DEV_DOMAIN } from '@env'
import WebView from 'app/components/WebView'
import { useAppSelector } from 'app/provider/redux/store'
import { useDripsyTheme } from 'dripsy'
import React, { ElementRef, useRef } from 'react'
import RNWebview from 'react-native-webview'
import { RewardPostMessagePayload, RewardPostMessageType } from 'utils/rewards'

interface EmbeddedContentProps {
  domainUrl: string
  onLoadCompleted?: () => void
  gameKey: string
  onTokenExpired?: () => void
}

const EmbeddedContent = (props: EmbeddedContentProps) => {
  const { domainUrl, onLoadCompleted, gameKey, onTokenExpired } = props
  const { theme } = useDripsyTheme()
  const webviewRef = useRef<ElementRef<typeof RNWebview>>(null)
  const authInfo = useAppSelector((state) => state.auth.info)
  const locale = useAppSelector((state) => state.setting.locale)

  const url = `${DEV_DOMAIN}${domainUrl}` // on APP, we need default domain to launch game at h5

  const stringifyPayload = () => {
    const payload: RewardPostMessagePayload = {
      type: RewardPostMessageType.gameSecretKey,
      payload: {
        secretKey: gameKey,
        userAuthInfo: authInfo,
        locale,
      },
    }

    return JSON.stringify(payload)
  }

  function onMessage(e) {
    try {
      const message = JSON.parse(e.nativeEvent.data)

      switch (message.type) {
        case RewardPostMessageType.sessionExpired: {
          // When RewardGameLauncher is unmounted, it will trigger refresh balance and auto redirect to login
          onTokenExpired?.()
          break
        }
        case RewardPostMessageType.endGame: {
          // When RewardGameLauncher is unmounted, it will trigger refresh balance and auto redirect to login
          onTokenExpired?.()
          break
        }
      }
    } catch (e) {}
  }

  return (
    <WebView
      ref={webviewRef}
      url={url}
      style={{ backgroundColor: 'transparent' }}
      onMessage={onMessage}
      containerStyle={{ flex: 1, backgroundColor: theme.colors?.$background }}
      onLoadEnd={() => {
        webviewRef.current?.postMessage(stringifyPayload())

        onLoadCompleted?.()
      }}
    />
  )
}

export default EmbeddedContent
