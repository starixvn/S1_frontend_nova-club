import { PageWithBackHeader } from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import SimpleWrap from 'app/components/SimpleWrap'
import fishing from 'app/config/games/fishing'
import sport from 'app/config/games/sport'
import useFishingGamesFilter from 'app/hooks/game/useFishingGamesFilter'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, FlatList, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import ListSectionHeader from '../ListSectionHeader'

const Fishing = () => {
  const { width, height } = useWindowDimensions()
  const { allGames } = useFishingGamesFilter()
  const { t } = useLocalization()
  return (
    <PageWithBackHeader header={{ title: t('game.category.fishing') }}>
      {true ? (
        <ActivityIndicator
          size={'large'}
          sx={{ mt: '$8' }}
          color={'$lightCyan'}
        />
      ) : (
        <>
          <ListSectionHeader
            title={'game.category.fishing'}
            bgColor="yellow"
            iconName="sb"
          />
          <View>
            <SimpleWrap
              data={allGames}
              col={3}
              context={ContextualModuleKey.Fishing}
            />
          </View>
        </>
      )}
    </PageWithBackHeader>
  )
}

export default withContextualNav(Fishing, ContextualModuleKey.Fishing)
