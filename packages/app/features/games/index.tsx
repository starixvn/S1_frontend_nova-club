import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { ScrollView, View } from 'dripsy'
import React from 'react'
import ListSectionHeader from '../ListSectionHeader'
import Fishing from './FishingGames'
import HotGames from './HotGames'
import MenuRow from './MenuRow'
import SlotGames from './SlotGames'

const Games = () => {
  return (
    <ScrollView sx={{ bg: '$background' }} showsVerticalScrollIndicator={false}>
      <ListSectionHeader title={'Games'} bgColor="green" iconName="games" />
      <MenuRow />
      <View sx={{ bg: '$lightNavyBlue', height: 1 }} />
      <HotGames />
      <Fishing />
      <SlotGames />
    </ScrollView>
  )
}

export default withContextualNav(Games, ContextualModuleKey.Home)
