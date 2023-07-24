import useContainerDimension from 'app/hooks/useContainerDimension'
import { Text } from 'dripsy'
import React, { useMemo, useState } from 'react'
import RenderHtml from 'react-native-render-html'

const MessageContent = ({ isHtml, content }) => {
  const { width, height } = useContainerDimension()
  const [webViewHeight, setWebViewHeight] = useState<number>(0)

  const webViewScript =
    'window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));'
  const onMessage = (event) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const styleContent = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
    <div style="font-size:17px;color:black;font-family: 'Noto Sans';">
    ${content}</div></body></html>`

  const htmlTagStyle = useMemo(() => {
    return {
      div: {
        fontSize: 17,
        color: 'black',
      },
    }
  }, [])

  return isHtml ? (
    <RenderHtml
      source={{
        html: `${content}` || '<p></p>',
      }}
      // baseStyle={htmlStyle}
      tagsStyles={htmlTagStyle}
    />
  ) : (
    <Text sx={{ color: 'black' }}>{content}</Text>
  )
}
export default MessageContent
