import Page from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import SimpleWrap from 'app/components/SimpleWrap'
import sport from 'app/config/games/sport'
import { FlatList, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import ListSectionHeader from '../ListSectionHeader'

const Sportsbook = () => {
  const { width, height } = useWindowDimensions()

  return (
    <Page.ScrollView>
      <ListSectionHeader title={'Sportsbook'} bgColor="yellow" iconName="sb" />
      <SimpleWrap col={2} data={sport.gameList} />
    </Page.ScrollView>
  )
}

export default Sportsbook
