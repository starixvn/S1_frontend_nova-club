import casino from 'app/config/games/casino'
import { Image, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const CasinoSection = () => {
  return (
    <View>
      <SectionHeader title={casino.label} bgColor={'maroon'} iconName={'lc'} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ ml: '$7' }}
      >
        {casino.gameList.map((i, index) => {
          return (
            <StyledImage key={i.image.toString() + index} source={i.image} />
          )
        })}
      </ScrollView>
    </View>
  )
}

const StyledImage = styled(Image)({
  margin: '$4',
  borderRadius: 5,
  height: [210, 220, 230],
  width: [130, 140, 150],
})

export default CasinoSection
