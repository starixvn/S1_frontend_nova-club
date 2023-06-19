import IconButton from 'app/components/IconButton'
import CheckBox from 'app/components/common/CheckBox'
import { ViewRow } from 'app/components/common/ViewRow'
import isDesktop from 'app/utils/isDesktop'
import { Container, Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import MessageCard from './components/MessageCard'

export const MessageList = [
  {
    id: 101,
    title: 'Title 1',
    subtitle: 'Subtitle 1',
    content:
      'Content 1 all message content show in here, Content 1 all message content show in here,.Content 1 all message content show in hereContent 1 all message content show in hereContent 1 all message content show in here',
  },
  {
    id: 102,
    title: 'Title 2',
    subtitle: 'Subtitle 2',
    content: 'Content 2 all message content show in here',
  },
  {
    id: 103,
    title: 'Title 3',
    subtitle: 'Subtitle 3',
    content: 'Content 3 all message content show in here',
  },
  {
    id: 104,
    title: 'Title 4',
    subtitle: 'Subtitle 4',
    content: 'Content 4 all message content show in here',
  },
  {
    id: 105,
    title: 'Title 5',
    subtitle: 'Subtitle 5',
    content: 'Content 5 all message content show in here',
  },
  {
    id: 106,
    title: 'Title 6',
    subtitle: 'Subtitle 6',
    content: 'Content 6 all message content show in here',
  },
]

const PersonalMessage = () => {
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState<number[]>([])
  const [list, setList] = useState<typeof MessageList>([])
  const desktop = isDesktop()

  useEffect(() => {
    setList(MessageList)
  }, [])

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(list.map((li) => li.id))
    if (isCheckAll) {
      setIsCheck([])
    }
  }

  const handleClick = (id) => {
    if (isCheck.includes(id)) {
      setIsCheck(isCheck.filter((item) => item !== id))
      isCheckAll && setIsCheckAll(!isCheckAll)
    } else setIsCheck([...isCheck, id].sort((a, b) => a - b))
  }

  const handleDelete = () => {
    console.log('Delete action')
  }

  const handleRefresh = () => {
    console.log('Refresh action')
  }

  return (
    <View>
      <Container
        sx={{
          ...(desktop ? { maxWidth: 500 } : {}),
        }}
      >
        <ViewRow sx={{ alignItems: 'center', p: 24, gap: 12 }}>
          <CheckBox isCheck={isCheckAll} onCheck={handleSelectAll} />
          <Text sx={{ flex: 1 }}>Select All</Text>

          <ViewRow sx={{ gap: 4 }}>
            <IconButton name="bin" onPress={handleDelete} />
            <IconButton name="refresh" onPress={handleRefresh} />
          </ViewRow>
        </ViewRow>

        {list.map((item) => (
          <View
            key={item.id}
            sx={{
              mb: 12,
              borderWidth: desktop ? 2 : 0,
              borderTopWidth: 2,
              borderColor: '$primary.100',
            }}
          >
            <MessageCard
              item={item}
              isChecked={isCheck.includes(item.id)}
              onCheck={(id) => handleClick(id)}
            />
          </View>
        ))}
      </Container>
    </View>
  )
}

export default PersonalMessage
