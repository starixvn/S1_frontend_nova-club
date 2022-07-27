import ListImage from 'app/components/ListImage'
import hotgame from 'app/config/games/hotgame'
import { View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const HotGamesSection = () => {
  return (
    <View sx={{ mb: '$7a' }}>
      <SectionHeader title={hotgame.label} bgColor="orange" iconName="fire" />
      <ListImage data={hotgame.gameList} />
    </View>
  )
}

export default HotGamesSection
