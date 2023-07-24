import { Text } from 'dripsy'
import React from 'react'

const MessageContent = ({ isHtml, content }) => {
  const styleContent = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
  <div style="font-size:17px;color:black;padding-top:12px;padding-bottom:12px;font-family: 'Noto Sans';">
  ${content}</div></body></html>`

  return isHtml ? (
    <div
      dangerouslySetInnerHTML={{
        __html: styleContent,
      }}
    />
  ) : (
    <Text sx={{ color: 'black' }}>{content}</Text>
  )
}
export default MessageContent
