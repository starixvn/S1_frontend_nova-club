import Accordian from 'app/components/Accordian'
import CheckBox from 'app/components/common/CheckBox'
import { ViewRow } from 'app/components/common/ViewRow'
import { Text, View, styled } from 'dripsy'
import React from 'react'

type Message = {
  id: number
  title: string
  subtitle: string
  content: string
}

type MessageCardProps = {
  item: Message
  isChecked?: boolean
  onCheck?: (arg0) => void
}

const MessageCard = ({ item, isChecked, onCheck }: MessageCardProps) => {
  const handlePress = () => {
    onCheck && onCheck(item.id)
  }

  return (
    <Accordian
      isExpandable
      extended={false}
      // onPress={handlePress}
      header={
        <MessageHeader
          title={item.title}
          subtitle={item.subtitle}
          isChecked={isChecked}
          onCheck={onCheck && handlePress}
        />
      }
    >
      <View sx={{ py: 12, px: 32, gap: 4 }}>
        <Text>{item.content}</Text>
      </View>
    </Accordian>
  )
}

const MessageHeader = ({ title, subtitle, isChecked, onCheck }) => {
  return (
    <ViewRow sx={{ alignItems: 'center', gap: 12 }}>
      {onCheck && <CheckBox isCheck={isChecked} onCheck={onCheck} />}
      <View>
        <TextTitle>{title}</TextTitle>
        <TextSubTitle>{subtitle}</TextSubTitle>
      </View>
    </ViewRow>
  )
}

const TextTitle = styled(Text)({
  fontWeight: '500',
  mb: 4,
})
const TextSubTitle = styled(Text)({
  opacity: 0.8,
})

export default MessageCard
