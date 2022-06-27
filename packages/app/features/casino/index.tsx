import SimpleWrap from 'app/components/SimpleWrap'
import casino from 'app/config/games/casino'
import hotgame from 'app/config/games/hotgame'
import { Image, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import ListSectionHeader from '../ListSectionHeader'

const Casino = () => {
  return (
    <ScrollView sx={{ bg: '$background' }} showsVerticalScrollIndicator={false}>
      <ListSectionHeader
        title={'Live Casino'}
        bgColor="maroon"
        iconName="lc"
        search
      />
      <View sx={{ mt: '$5' }}>
        <SimpleWrap data={casino.gameList} showTitle={true} />
      </View>
    </ScrollView>
  )
}
const StyledImage = styled(Image)({
  margin: '$2',
  borderRadius: 10,
  height: [210, 220, 230],
  width: [130, 140, 150],
})

export default Casino
