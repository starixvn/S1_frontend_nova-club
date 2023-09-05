import { useAppSelector } from 'app/provider/redux/store'
import React, { ElementRef, useEffect, useRef } from 'react'
import {
  RewardPostMessagePayload,
  RewardPostMessageType,
  iFrameRewardOrigin,
} from 'utils/rewards'

interface EmbeddedContentProps {
  domainUrl: string
  onLoadCompleted?: () => void
  gameKey: string
  onTokenExpired?: () => void
}

const EmbeddedContent = (props: EmbeddedContentProps) => {
  const { domainUrl, onLoadCompleted, gameKey, onTokenExpired } = props
  const locale = useAppSelector((state) => state.setting.locale)

  const iframeRef = useRef<ElementRef<'iframe'>>(null)

  const onLoad = () => {
    /**
     * To make sure iFrame `addEventListener('message')` is loaded and
     * start listening before `postMessage` to iFrame
     */
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: RewardPostMessageType.gameSecretKey,
          payload: {
            secretKey: gameKey,
            locale,
          },
        } as RewardPostMessagePayload,
        iFrameRewardOrigin
      )

      onLoadCompleted?.()
    }, 100)
  }

  function handleTokenExpired(e: MessageEvent<RewardPostMessagePayload>) {
    try {
      if (e.origin !== iFrameRewardOrigin) {
        return
      }

      const eventData = e.data
      if (eventData) {
        const data =
          typeof eventData === 'string'
            ? (JSON.parse(eventData) as RewardPostMessagePayload)
            : eventData

        if (data.type === RewardPostMessageType.sessionExpired) {
          onTokenExpired?.()
          return
        }
      }
    } catch (e) {
      console.error('handleTokenExpired error', e)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleTokenExpired)
    return () => {
      window.removeEventListener('message', handleTokenExpired)
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src={domainUrl}
      style={{
        border: 0,
        flex: 1,
      }}
      onLoad={onLoad}
    />
  )
}

export default EmbeddedContent
