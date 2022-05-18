import lottery from 'app/config/games/lottery'
import { Image, ScrollView, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const LotterySection = () => {
  return (
    <View>
      <SectionHeader title={lottery.label} bgColor="purple" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ ml: '$7' }}
      >
        {lottery.gameList.map((i) => {
          return (
            <Image
              key={i.image}
              source={i.image}
              sx={{
                margin: '$2',
                borderRadius: 5,
                height: [110, 130, 150],
                width: [110, 130, 150],
              }}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default LotterySection
