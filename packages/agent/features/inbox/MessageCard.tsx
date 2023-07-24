import Icon from 'agent/components/Icon'
import {
  useLazyAnnouncementDetailQuery,
  useLazyMessageDetailQuery,
} from 'agent/services/contentApi'
import Accordian from 'app/components/Accordian'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { Text, View, styled, useDripsyTheme } from 'dripsy'
import { MotiView } from 'moti'
import { FC, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import MessageContent from './MessageContent'

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

  const { theme } = useDripsyTheme()

  const firstItem = index === 0

  const handleExpand = async () => {
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
    <Accordian
      isExpandable
      extended={false}
      onPress={handleExpand}
      header={<ParentItem title={title} isExtend={isExtend} />}
      icon={<Icon name="arrow-down" color="black" size={25} />}
      color={theme.colors.$primaryAgent}
      containerStyle={{ borderColor: '$primaryAgent' }}
      parentStyle={{ bg: 'transparent', px: 0, mx: 0 }}
      childStyle={{ bg: 'transparent' }}
    >
      <View sx={{ py: isHtml ? 0 : '$3', px: '$3' }}>
        <MessageContent isHtml={isHtml} content={content} />
      </View>
    </Accordian>
  )
}

const ParentItem = ({ title, isExtend }) => {
  return (
    <View sx={{ flexDirection: 'row', alignItems: 'center', px: '$3' }}>
      {/* {onToggle && <CheckBox onCheck={_onToggle} isCheck={selected} />} */}
      <Text
        numberOfLines={isExtend ? undefined : 2}
        sx={{ color: 'black', fontWeight: 'bold' }}
      >
        {title}
      </Text>
    </View>
  )
}

// const MessageContent = ({ isHtml, content }) => {
//   const { width, height } = useContainerDimension()
//   const [webViewHeight, setWebViewHeight] = useState<number>(0)

//   const webViewScript =
//     'window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));'
//   const onMessage = (event) => {
//     setWebViewHeight(Number(event.nativeEvent.data))
//   }

//   const styleContent = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>
//   <div style="font-size:17px;color:black;margin-left:8px;font-family: 'Noto Sans';">
//   ${content}</div></body></html>`

//   const htmlTagStyle = useMemo(() => {
//     return {
//       div: {
//         fontSize: 17,
//         color: 'black',
//         marginLeft: 8,
//       },
//     }
//   }, [])

//   if (isHtml) {
//     return (
//       <>
//         {Platform.OS === 'web' ? (
//           <div
//             dangerouslySetInnerHTML={{
//               __html: styleContent,
//             }}
//           />
//         ) : (
//           <RenderHtml
//             source={{
//               html: `${content}` || '<p></p>',
//             }}
//             // baseStyle={htmlStyle}
//             tagsStyles={htmlTagStyle}
//           />
//           // <WebView
//           //   style={{
//           //     width,
//           //     height: webViewHeight,
//           //     backgroundColor: 'transparent',
//           //   }}
//           //   originWhitelist={['*']}
//           //   source={{
//           //     uri: styleContent,
//           //   }}
//           //   injectedJavaScript={webViewScript}
//           //   onMessage={onMessage}
//           // />
//         )}
//       </>
//     )
//   } else {
//     return <Text sx={{ px: '$3', pt: '$2', color: 'black' }}>{content}</Text>
//   }
// }

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
  py: '$3',
})

export default MessageCard
