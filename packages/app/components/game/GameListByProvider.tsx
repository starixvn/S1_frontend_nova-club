import { useGameFilter } from 'app/provider/gameFilter/GameFilterProvider'
import { View } from 'dripsy'
import React, { useMemo } from 'react'
import ProviderList from './ProviderList'
import groupBy from 'lodash/groupBy'
import GameSectionByProvider from './GameSectionByProvider'

export default function GameListByProvider() {
  const { games } = useGameFilter()
  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  return (
    <View>
      <ProviderList data={providers} />
      <GameSectionByProvider data={gamesByProviders} />
    </View>
  )
}
