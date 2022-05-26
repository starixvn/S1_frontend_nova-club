import sport from 'app/config/games/sport'
import { FlatList, styled, View } from 'dripsy'
import React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import ListSectionHeader from '../ListSectionHeader'

const Sportsbook = () => {
  const { width, height } = useWindowDimensions()
  const StyledImage = styled(Image)({
    m: '$3',
    borderRadius: 10,
    width: [width / 2.25, width / 2.25, width / 2.25],
    height: [width / 2.2, width / 2.2, width / 2.2],
  })

  return (
    <View sx={{ bg: '$background', flex: 1 }}>
      <ListSectionHeader title={'SPORTSBOOK'} bgColor="yellow" iconName="sb" />
      <FlatList
        keyExtractor={(item: any) => item.image}
        style={{ paddingBottom: 30, paddingHorizontal: 8 }}
        data={sport.gameList}
        numColumns={2}
        renderItem={({ item, index }: { item: any; index: number }) => {
          return (
            <View key={index}>
              <StyledImage source={item.image} resizeMode={'cover'} />
            </View>
          )
        }}
      />
    </View>
  )
}

export default Sportsbook
