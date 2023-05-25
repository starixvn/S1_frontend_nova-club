import { View, Text } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { MessageList } from '../messages/PersonalMessage'
import MessageCard from '../messages/components/MessageCard'

const QrTransfer = () => {
  const [list, setList] = useState<typeof MessageList>([])

  useEffect(() => {
    setList(MessageList)
  }, [])

  return (
    <View>
      {list.map((item) => (
        <View key={item.id} sx={{ mb: 12 }}>
          <MessageCard item={item} />
        </View>
      ))}
    </View>
  )
}

export default QrTransfer
