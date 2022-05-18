import lottery from 'app/config/games/lottery'
import { Image, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const LotterySection = () => {
  return (
    <View>
      <SectionHeader title={lottery.label} bgColor="purple" iconName="lt" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ ml: '$7' }}
      >
        {lottery.gameList.map((i) => {
          return <StyledImage key={i.image.toString()} source={i.image} />
        })}
      </ScrollView>
    </View>
  )
}

const StyledImage = styled(Image)({
  margin: '$1',
  borderRadius: 5,
  height: [110, 130, 150],
  width: [110, 130, 150],
})

export default LotterySection
