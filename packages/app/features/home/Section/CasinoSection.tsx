import casino from 'app/config/games/casino'
import { Image, ScrollView, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const CasinoSection = () => {
  return (
    <View>
      <SectionHeader title={casino.label} bgColor={'maroon'} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ ml: '$7' }}
      >
        {casino.gameList.map((i, index) => {
          return (
            <Image
              key={i.image.toString() + index}
              source={i.image}
              sx={{
                margin: '$4',
                borderRadius: 5,
                height: [210, 220, 230],
                width: [130, 140, 150],
              }}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default CasinoSection
