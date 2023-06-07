import GamePageHeader from 'app/components/GamePageHeader'
import React, { useMemo } from 'react'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import ProviderList from 'app/components/game/ProviderList'
import { useGameFilter } from 'app/provider/gameFilter/GameFilterProvider'

export default function GamesScreenTopSection() {
  const { games, gamesByProviders } = useGameFilter()

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  return (
    <>
      <GamePageHeader icon="sl" title="SLOTS" />
      <RecentlyPlayedSection />
      <ProviderList data={providers} />
    </>
  )
}
