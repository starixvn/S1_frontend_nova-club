import { PageWithBackHeader } from 'app/components/layout/Page'
import ListImage from 'app/components/ListImage'
import SimpleGridImage from 'app/components/SimpleGridImage'
import SimpleWrap from 'app/components/SimpleWrap'
import fishing from 'app/config/games/fishing'
import lottery from 'app/config/games/lottery'
import sport from 'app/config/games/sport'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
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

export default withContextualNav(Fishing, ContextualModuleKey.Home)
