import { FlashList } from '@shopify/flash-list'
import { useGameFilter } from 'app/provider/gameFilter/GameFilterProvider'
import groupBy from 'lodash/groupBy'
import React, { useMemo } from 'react'
import GameSectionByProviderItem from './GameSectionByProviderItem'

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
    />
    // <GameSectionByProvider data={gamesByProviders} />
  )
}
