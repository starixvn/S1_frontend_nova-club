import SimpleGridImage from 'app/components/SimpleGridImage'
import sport from 'app/config/games/sport'
import { FlatList, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import ListSectionHeader from '../ListSectionHeader'

const Sportsbook = () => {
  const { width, height } = useWindowDimensions()

  return (
    <ScrollView sx={{ bg: '$background' }} showsVerticalScrollIndicator={false}>
      <ListSectionHeader title={'SPORTSBOOK'} bgColor="yellow" iconName="sb" />
      <View>
        <SimpleGridImage data={sport.gameList} />
      </View>
    </ScrollView>
  )
}

export default Sportsbook
