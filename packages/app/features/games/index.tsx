import useLocalization from 'app/provider/localization'
import { ScrollView, View } from 'dripsy'
import React from 'react'
import ListSectionHeader from '../ListSectionHeader'
import Fishing from './FishingGames'
import HotGames from './HotGames'
import MenuRow from './MenuRow'
import SlotGames from './SlotGames'

const Games = () => {
  const { t } = useLocalization()

  return (
    <ScrollView sx={{ bg: '$background' }} showsVerticalScrollIndicator={false}>
      <ListSectionHeader
        title={t('game.category.games')}
        bgColor="green"
        iconName="games"
      />
      <MenuRow />
      <View sx={{ bg: '$lightNavyBlue', height: 1 }} />
      <HotGames />
      <Fishing />
      <SlotGames />
    </ScrollView>
  )
}

export default Games
