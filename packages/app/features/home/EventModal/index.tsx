import React from 'react'
import HomeEventProvider from './HomeEventProvider'

import ChristmasGiftTrigger from './events/christmasGift/Trigger'
import EventPopUpTrigger from './events/eventPopUp/Trigger'
import LuckyDrawTrigger from './events/luckyDraw/Trigger'
import ChristmasSpecialTrigger from './events/christmasSpecial/Trigger'

export default function ModalTriggers() {
  return (
    <HomeEventProvider>
      <EventPopUpTrigger />
      <LuckyDrawTrigger />
      <ChristmasGiftTrigger />
      <ChristmasSpecialTrigger />
    </HomeEventProvider>
  )
}
