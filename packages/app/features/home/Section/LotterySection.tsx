import ListImage from 'app/components/ListImage'
import lottery from 'app/config/games/lottery'
import { View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const LotterySection = () => {
  return (
    <View>
      <SectionHeader title={lottery.label} bgColor="purple" iconName="lt" />
      {/* <ListImage data={lottery.gameList} /> */}
    </View>
  )
}

export default LotterySection
