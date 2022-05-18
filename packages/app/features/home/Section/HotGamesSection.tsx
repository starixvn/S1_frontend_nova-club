import hotgame from 'app/config/games/hotgame'
import { Image, ScrollView, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const HotGamesSection = () => {
  return (
    <View>
      <SectionHeader title={hotgame.label} bgColor="orange" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ ml: '$7' }}
      >
        {hotgame.gameList.map((i) => {
          return (
            <Image
              key={i.image}
              source={i.image}
              sx={{
                margin: 2,
                mb: '$15',
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

export default HotGamesSection
