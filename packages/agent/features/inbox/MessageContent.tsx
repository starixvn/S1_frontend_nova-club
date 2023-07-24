import { Text } from 'dripsy'
import React, { useMemo } from 'react'
import RenderHtml from 'react-native-render-html'

const MessageContent = ({ isHtml, content }) => {
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
        html: content.replace('&nbsp;', ' ') || '<p></p>',
      }}
      htmlParserOptions={{ decodeEntities: false }}
      // baseStyle={htmlStyle}
      tagsStyles={htmlTagStyle}
    />
  ) : (
    <Text sx={{ color: 'black' }}>{content}</Text>
  )
}
export default MessageContent
