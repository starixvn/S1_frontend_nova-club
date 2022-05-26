import { ScrollView } from 'dripsy'
import React from 'react'
import ListSectionHeader from '../ListSectionHeader'
import Fishing from './FishingGames'
import HotGames from './HotGames'
import MenuRow from './MenuRow'
import SlotGames from './SlotGames'

const Games = () => {
  return (
    <ScrollView sx={{ bg: '$background' }}>
      <ListSectionHeader title={'Games'} bgColor="green" iconName="games" />
      <MenuRow />
      <HotGames />
      <Fishing />
      <SlotGames />
    </ScrollView>
  )
}

export default Games
