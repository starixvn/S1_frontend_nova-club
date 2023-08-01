import {
  useLazyAnnouncementDetailQuery,
  useLazyMessageDetailQuery,
} from 'agent/services/contentApi'
import CheckBox from 'app/components/CheckBox'
import Icon from 'app/components/Icon'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { AnimateHeight } from 'app/transitions/animate-height'
import { ActivityIndicator, Text, View, styled } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import { FC, useState } from 'react'
import { Platform } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'

export interface MessageCardProps {
  selected?: boolean
  isHtml?: boolean
  isMessage?: boolean
  onToggle?: (id: string) => void
  id: string
  title: string
  content?: string
  time?: string
  index: number
}

const MessageCard: FC<MessageCardProps> = ({
  selected,
  isHtml,
  isMessage = false,
  onToggle,
  id,
  title,
  time,
  index,
}) => {
  function _onToggle() {
    onToggle && onToggle(id)
  }

  const [isExtend, setIsExtend] = useState(false)
  const { width, height } = useContainerDimension()
  const [content, setContent] = useState('')
  const [fetchAnnouncementDetails, { isFetching }] =
    useLazyAnnouncementDetailQuery()
  const [fetchMessageDetails, { isFetching: isMessageFetching }] =
    useLazyMessageDetailQuery()

  const firstItem = index === 0

  const handlePress = async () => {
    setIsExtend(!isExtend)
    if (!isExtend) {
      isMessage ? handleMessageDetail() : handleAnnouncementDetail()
    }
  }

  const handleAnnouncementDetail = async () => {
    try {
      const { result, success } = await fetchAnnouncementDetails({
        id,
      })
        .unwrap()
        .catch((error) => {
          return error
        })

      if (success) {
        setContent(result.data.content)
      } else setContent('Error fetching message')
    } catch (error) {
      console.log('🚀 ~ file: MessageCard.tsx:58 ~ handlePress ~ error:', error)
    }
  }

  const handleMessageDetail = async () => {
    try {
      const { result, success } = await fetchMessageDetails({
        id,
      })
        .unwrap()
        .catch((error) => {
          return error
        })

      if (success) {
        setContent(result.data.message)
      } else setContent('Error fetching message')
    } catch (error) {
      console.log('🚀 ~ file: MessageCard.tsx:58 ~ handlePress ~ error:', error)
    }
  }

  return (
    <MotiPressable onPress={handlePress} key={id}>
      <StyledView sx={{ mt: firstItem ? 0 : '$2a' }}>
        <View sx={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {onToggle && <CheckBox onCheck={_onToggle} isCheck={selected} />}
          <View sx={{ pl: onToggle ? '$3' : '$2' }}>
            <Text
              sx={{
                color: 'black',
                fontWeight: 'bold',
                pr: '$3',
                width: width - 80,
              }}
            >
              {title}
            </Text>
            {/* <Text sx={{ color: 'black', fontSize: 13, pt: title ? '$1' : 0 }}>
              {dayjsTz(time).format('YYYY-MM-DD HH:mm:ss')}
            </Text> */}
          </View>
        </View>
        <MotiView
          animate={{ rotate: isExtend ? '-180deg' : '0deg' }}
          transition={{
            type: 'timing',
            duration: 350,
          }}
        >
          <Icon name="chevdown" color="black" size={25} />
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
            >
              {isFetching || isMessageFetching ? (
                <ActivityIndicator size={36} />
              ) : (
                <MessageContent isHtml={isHtml} content={content} />
              )}
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
  <div style="font-size:17px;color:black;margin-left:8px;font-family: 'Noto Sans';">
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
    return <Text sx={{ px: '$3', pt: '$2', color: 'black' }}>{content}</Text>
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
  borderColor: '$borderBlue',
  alignItems: 'center',
  py: '$4',
})

export default MessageCard
