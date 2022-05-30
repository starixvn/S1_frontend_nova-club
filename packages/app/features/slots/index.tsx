import SimpleGridImage from 'app/components/SimpleGridImage'
import fishing from 'app/config/games/fishing'
import { ScrollView } from 'dripsy'
import React from 'react'
import ListSectionHeader from '../ListSectionHeader'

const Slots = () => {
  return (
    <ScrollView sx={{ bg: '$background' }} showsVerticalScrollIndicator={false}>
      <ListSectionHeader title={'Slots'} bgColor="lightPurple" iconName="sl" />
      <SimpleGridImage data={fishing.gameList} />
    </ScrollView>
  )
}

export default Slots
