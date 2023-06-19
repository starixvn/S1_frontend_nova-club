import { Container, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { MessageList } from './PersonalMessage'
import MessageCard from './components/MessageCard'
import isDesktop from 'app/utils/isDesktop'

const AnnouncementScreen = () => {
  const [list, setList] = useState<typeof MessageList>([])
  const desktop = isDesktop()

  useEffect(() => {
    setList(MessageList)
  }, [])

  return (
    <Container
      sx={{
        ...(desktop ? { maxWidth: 500, mt: '$4' } : {}),
      }}
    >
      {list.map((item) => (
        <View
          key={item.id}
          sx={{
            mb: 12,
            borderWidth: isDesktop() ? 2 : 0,
            borderTopWidth: 2,
            borderColor: '$primary.100',
          }}
        >
          <MessageCard item={item} />
        </View>
      ))}
    </Container>
  )
}

export default AnnouncementScreen
