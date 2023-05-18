import { View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { MessageList } from './PersonalMessage'
import MessageCard from './components/MessageCard'

const AnnouncementScreen = () => {
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

export default AnnouncementScreen
