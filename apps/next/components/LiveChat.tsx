import { EventHandlerPayload, LiveChatWidget } from '@livechat/widget-react'
import React from 'react'

const LiveChat = () => {
  function handleNewEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event)
  }

  return <LiveChatWidget license="14440122" visibility="minimized" />
}

export default LiveChat
