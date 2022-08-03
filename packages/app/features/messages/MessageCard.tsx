import CheckBox from 'app/components/CheckBox'
import Icon from 'app/components/Icon'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { AnimateHeight } from 'app/transitions/animate-height'
import dayjs from 'dayjs'
import { styled, Text, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import { FC, useState } from 'react'
import { Platform } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'

export interface MessageCardProps {
  selected?: boolean
  isHtml?: boolean
  onToggle?: (id: number) => void
  id: number
  title: string
  content: string
  time?: string
  index: number
}

const MessageCard: FC<MessageCardProps> = ({
  selected,
  isHtml,
  onToggle,
  id,
  title,
  content,
  time,
  index,
}) => {
  function _onToggle() {
    onToggle && onToggle(id)
  }

  const [isExtend, setIsExtend] = useState(false)
  const { width, height } = useContainerDimension()

  const handlePress = () => {
    setIsExtend(!isExtend)
  }

  const firstItem = index === 0

  return (
    <MotiPressable onPress={handlePress} key={id}>
      <StyledView sx={{ mt: firstItem ? 0 : '$2a' }}>
        <View sx={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {onToggle && <CheckBox onCheck={_onToggle} isCheck={selected} />}
          <View sx={{ pl: onToggle ? '$3' : '$2' }}>
            <Text
              sx={{
                color: 'white',
                fontWeight: 'bold',
                pr: '$3',
                width: width - 80,
              }}
            >
              {title}
            </Text>
            <Text sx={{ color: 'white', fontSize: 13, pt: title ? '$1' : 0 }}>
              {dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </View>
        </View>
        <MotiView
          animate={{ rotate: isExtend ? '-180deg' : '0deg' }}
          transition={{
            type: 'timing',
            duration: 350,
          }}
        >
          <Icon name="chevdown" size={25} />
        </MotiView>
      </StyledView>
      <AnimateHeight enterFrom="bottom" hide={!isExtend}>
        <AnimatePresence>
          {isExtend && (
            <StyledMotiView
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              style={{}}
            >
              <MessageContent isHtml={isHtml} content={content} />
            </StyledMotiView>
          )}
        </AnimatePresence>
      </AnimateHeight>
    </MotiPressable>
  )
}

const MessageContent = ({ isHtml, content }) => {
  const { width, height } = useContainerDimension()
  const [webViewHeight, setWebViewHeight] = useState<number>(0)

  const webViewScript =
    'window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));'
  const onMessage = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const styleContent = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
  <div style="font-size:17px;color:white;margin-left:8px;font-family: 'Helvetica Neue';">
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
              width,
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

const StyledMotiView = styled(MotiView)({
  flex: 1,
  borderTopWidth: 1,
  borderTopColor: '$lightNavyBlue',
  justifyContent: 'center',
  minHeight: 100,
})

const StyledView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  p: '$3',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '$border2',
  alignItems: 'center',
  bg: '$secondary',
  py: '$4',
})

export default MessageCard
