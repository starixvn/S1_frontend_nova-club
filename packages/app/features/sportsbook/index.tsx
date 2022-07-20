import Page from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import SimpleWrap from 'app/components/SimpleWrap'
import sport from 'app/config/games/sport'
import useLocalization from 'app/provider/localization'
import { FlatList, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import ListSectionHeader from '../ListSectionHeader'

const Sportsbook = () => {
  const { width, height } = useWindowDimensions()
  const { t } = useLocalization()

  return (
    <Page.ScrollView>
      <ListSectionHeader
        title={t('game.category.sportsbook')}
        bgColor="yellow"
        iconName="sb"
      />
      <SimpleWrap col={2} data={sport.gameList} />
    </Page.ScrollView>
  )
}

export default Sportsbook
