import { PageWithBackHeader } from 'app/components/layout/Page'
import SimpleWrap from 'app/components/SimpleWrap'
import lottery from 'app/config/games/lottery'
import useLocalization from 'app/provider/localization'
import { FlatList, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import ListSectionHeader from '../ListSectionHeader'

const Fishing = () => {
  const { width, height } = useWindowDimensions()

  const { t } = useLocalization(0)
  return (
    <PageWithBackHeader header={{ title: t('game.category.keno/lottery') }}>
      <ListSectionHeader
        title={t('game.category.keno/lottery')}
        bgColor="purple"
        iconName="lt"
      />
      <View>
        <SimpleWrap data={lottery.gameList} />
      </View>
    </PageWithBackHeader>
  )
}

export default Fishing
