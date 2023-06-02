import { useGameFilter } from 'app/provider/gameFilter/GameFilterProvider'
import { View } from 'dripsy'
import React, { useMemo } from 'react'
import ProviderList from './ProviderList'
import groupBy from 'lodash/groupBy'
import GameSectionByProvider from './GameSectionByProvider'
import { FlashList } from '@shopify/flash-list'
import { useWindowDimensions } from 'react-native'
import GameSectionByProviderItem from './GameSectionByProviderItem'
import GamePageHeader from '../GamePageHeader'
import BannerSection from 'app/features/home/BannerSection'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import TopGameSection from 'app/features/home/TopGameSection'
import JackpotGameSection from 'app/features/home/JackpotGameSection'

export default function GameListByProvider() {
  const { games } = useGameFilter()
  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  const gameGroup = useMemo(() => {
    return Object.values(gamesByProviders).filter((v) => v.length > 0)
  }, [gamesByProviders])

  return (
    <FlashList
      estimatedItemSize={273}
      data={gameGroup}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      renderItem={({ item }) => {
        return <GameSectionByProviderItem gpc={item[0].gpc} games={item} />
      }}
      ListHeaderComponent={
        <>
          <GamePageHeader icon="sl" title="SLOTS" />
          <BannerSection />
          <RecentlyPlayedSection />
          <TopGameSection />
          <JackpotGameSection />
          <JackpotGameSection />
          <JackpotGameSection />
          <ProviderList data={providers} />
        </>
      }
    />
    // <GameSectionByProvider data={gamesByProviders} />
  )
}
