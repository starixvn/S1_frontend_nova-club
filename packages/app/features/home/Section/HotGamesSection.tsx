import hotgame from 'app/config/games/hotgame'
import { Image, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const HotGamesSection = () => {
  return (
    <View>
      <SectionHeader title={hotgame.label} bgColor="orange" iconName="sb" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ ml: '$7' }}
      >
        {hotgame.gameList.map((i) => {
          return <StyledImage key={i.image.toString()} source={i.image} />
        })}
      </ScrollView>
    </View>
  )
}

const StyledImage = styled(Image)({
  margin: 2,
  mb: '$15',
  borderRadius: 5,
  height: [110, 130, 150],
  width: [110, 130, 150],
})

export default HotGamesSection
