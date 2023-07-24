import Accordian from 'app/components/Accordian'
import CheckBox from 'app/components/common/CheckBox'
import { ViewRow } from 'app/components/common/ViewRow'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import HTMLLoader from './HTMLLoader'

type MessageCardProps = {
  selected?: boolean
  isHtml?: boolean
  onToggle?: (id: number) => void
  id: number
  title: string
  content: string
  time?: string
  index: number
}

const MessageCard = ({
  selected,
  isHtml,
  onToggle,
  id,
  title,
  content,
  time,
}: MessageCardProps) => {
  const handlePress = () => {
    onToggle && onToggle(id)
  }

  return (
    <Accordian
      isExpandable
      extended={false}
      parentStyle={{ px: '$3' }}
      // onPress={handlePress}
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
    <ViewRow sx={{ alignItems: 'center', gap: '$3', flex: 1 }}>
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
