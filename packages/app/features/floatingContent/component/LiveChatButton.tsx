import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { useContext } from 'react'
import { FloatingContext } from '../FloatingContext'

const LiveChatButton = () => {
  const { activeLiveChat, toggleLiveChat } = useContext(FloatingContext)

  return (
    <Button
      onPress={() => {
        toggleLiveChat(!activeLiveChat)
      }}
      rounded
      variant="lg"
      fill={{
        type: 'gradient',
        color: 'secondary',
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      }}
      containerStyle={{ width: 50, height: 50, px: 2 }}
    >
      <Icon name="cs" size={30} />
    </Button>
  )
}

export default LiveChatButton
