import Accordian from 'app/components/Accordian'
import CheckBox from 'app/components/common/CheckBox'
import { ViewRow } from 'app/components/common/ViewRow'
import { Text, View, styled } from 'dripsy'
import React, { useState } from 'react'
import HTMLLoader from './HTMLLoader'
import { useLazyMessageDetailsQuery } from 'services/messageApi'

type MessageCardProps = {
  selected?: boolean
  isHtml?: boolean
  onToggle?: (id: number) => void
  id: number
  title: string
  time?: string
  index: number
}

const MessageCard = ({
  selected,
  isHtml,
  onToggle,
  id,
  title,
  time,
}: MessageCardProps) => {
  const [isExtend, setIsExtend] = useState(false)
  const [content, setContent] = useState('')
  const [fetchMessageDetails] = useLazyMessageDetailsQuery()

  const handleMessageDetail = async () => {
    try {
      const { data, success } = await fetchMessageDetails({
        message_id: id,
      })
        .unwrap()
        .catch((error) => {
          return error
        })

      if (success) {
        setContent(data.message)
      } else setContent('Error fetching message')
    } catch (error) {
      console.log(
        '🚀 ~ file: MessageCard.tsx:44 ~ handleMessageDetail ~ error:',
        error
      )
    }
  }
  const handlePress = () => {
    onToggle && onToggle(id)
  }

  const handleExpand = async () => {
    setIsExtend(!isExtend)
    !isExtend && handleMessageDetail()
  }

  return (
    <Accordian
      isExpandable
      extended={false}
      parentStyle={{ px: '$3' }}
      onPress={handleExpand}
      header={
        <MessageHeader
          title={title}
          subtitle={time}
          isChecked={selected}
          onCheck={onToggle && handlePress}
        />
      }
    >
      <View sx={{ px: '$4', py: '$3' }}>
        {isHtml ? <HTMLLoader content={content} /> : <Text>{content}</Text>}
      </View>
    </Accordian>
  )
}

const MessageHeader = ({ title, subtitle, isChecked, onCheck }) => {
  return (
    <ViewRow sx={{ alignItems: 'center', gap: '$3' }}>
      {onCheck && <CheckBox isCheck={isChecked} onCheck={onCheck} />}
      <View sx={{ flex: 1 }}>
        <TextTitle>{title}</TextTitle>
        {subtitle && <TextSubTitle>{subtitle}</TextSubTitle>}
      </View>
    </ViewRow>
  )
}

const TextTitle = styled(Text)({
  fontWeight: 'bold',
  width: '100%',
})
const TextSubTitle = styled(Text)({
  opacity: 0.8,
  fontSize: 14,
})

export default MessageCard
