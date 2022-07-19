import { PageWithBackHeader } from 'app/components/layout/Page'
import SimpleWrap from 'app/components/SimpleWrap'
import useFishingGamesFilter from 'app/hooks/game/useFishingGamesFilter'
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
      {allGames.length === 0 ? (
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
            iconName="fg"
          />
          <View>
            <SimpleWrap data={allGames} col={3} />
          </View>
        </>
      )}
    </PageWithBackHeader>
  )
}

export default Fishing
