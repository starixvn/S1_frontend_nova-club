import React, { useState } from 'react'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
type Props = {
  content: string
}

export default function HTMLLoader({ content }: Props) {
  const [webViewHeight, setWebViewHeight] = useState<number>(0)

  const webViewScript =
    'window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));'
  const onMessage = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const styleContent = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
  <div style="font-size:16px;color:white;font-family: 'AvertaStd';"><style>p{margin-block-start: 0px;margin-block-end:0px;}</style>
  ${content}</div></body></html>`

  return (
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
  )
}
