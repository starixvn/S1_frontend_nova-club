import { Text } from 'dripsy'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'

type Props = {
  isHtml?: boolean
  content: string
}

export default function MessageContent({ isHtml, content }: Props) {
  const [webViewHeight, setWebViewHeight] = useState<number>(0)

  const webViewScript =
    'window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));'
  const onMessage = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const styleContent = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
    <div style="font-size:17px;color:white;margin-left:8px;font-family: 'Noto Sans'; font-weight: bold">
    ${content}</div></body></html>`

  if (isHtml) {
    return (
      <>
        {Platform.OS === 'web' ? (
          <div
            dangerouslySetInnerHTML={{
              __html: styleContent,
            }}
          />
        ) : (
          <WebView
            style={{
              height: webViewHeight,
              backgroundColor: 'transparent',
            }}
            originWhitelist={['*']}
            source={{
              html: styleContent,
            }}
            injectedJavaScript={webViewScript}
            onMessage={onMessage}
          />
        )}
      </>
    )
  } else {
    return <Text sx={{ px: '$3', pt: '$2' }}>{content}</Text>
  }
}
