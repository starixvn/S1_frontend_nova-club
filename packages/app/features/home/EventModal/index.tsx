import React from 'react'
import HomeEventProvider from './HomeEventProvider'
import EventPopUpTrigger from './events/eventPopUp/Trigger'
import LuckyDrawTrigger from './events/luckyDraw/Trigger'
import MysteryDropTrigger from './events/mysteryDrop/Trigger'
import Retention3Trigger from './events/retention3/Trigger'

export default function ModalTriggers() {
  return (
    <HomeEventProvider>
      <EventPopUpTrigger />
      <LuckyDrawTrigger />
      <MysteryDropTrigger />
      <Retention3Trigger />
    </HomeEventProvider>
  )
}
