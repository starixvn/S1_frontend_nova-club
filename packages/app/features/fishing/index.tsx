import SimpleGridImage from 'app/components/SimpleGridImage'
import SimpleWrap from 'app/components/SimpleWrap'
import fishing from 'app/config/games/fishing'
import sport from 'app/config/games/sport'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { FlatList, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import ListSectionHeader from '../ListSectionHeader'

const Fishing = () => {
  const { width, height } = useWindowDimensions()

  return (
    <ScrollView sx={{ bg: '$background' }} showsVerticalScrollIndicator={false}>
      <ListSectionHeader
        title={'game.category.fishing'}
        bgColor="yellow"
        iconName="sb"
      />
      <View>
        <SimpleWrap
          data={fishing.gameList}
          col={3}
          context={ContextualModuleKey.Fishing}
        />
      </View>
    </ScrollView>
  )
}

export default withContextualNav(Fishing, ContextualModuleKey.Fishing)
