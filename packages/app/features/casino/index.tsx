import SimpleGridImage from 'app/components/SimpleGridImage'
import casino from 'app/config/games/casino'
import hotgame from 'app/config/games/hotgame'
import { Image, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import ListSectionHeader from '../ListSectionHeader'

const Casino = () => {
  return (
    <ScrollView sx={{ bg: '$background' }}>
      <ListSectionHeader title={'Live Casino'} bgColor="maroon" iconName="lc" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ pl: '$7' }}
      >
        {casino.gameList.map((i, index) => {
          return (
            <StyledImage key={i.image.toString() + index} source={i.image} />
          )
        })}
      </ScrollView>
      <View sx={{ mt: '$10' }}>
        <SimpleGridImage data={hotgame.gameList} />
      </View>
    </ScrollView>
  )
}
const StyledImage = styled(Image)({
  margin: '$4',
  borderRadius: 10,
  height: [210, 220, 230],
  width: [130, 140, 150],
})

export default Casino
