import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import {
  useGameFilter,
  withGameFilterProvider,
} from 'app/provider/gameFilter/GameFilterProvider'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import ProviderList from 'desktop-ext/components/game/ProviderList'
import { ActivityIndicator, Container, Row, View } from 'dripsy'
import React, { startTransition, useEffect, useMemo, useState } from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { createParam } from 'solito'
import groupBy from 'lodash/groupBy'
import { Game } from 'services/gameApi.type'

type Props = {}

type Params = {
  provider?: string
}
const { useParam } = createParam<Params>()

function SlotScreen({}: Props) {
  const [provider, setProvider] = useParam('provider')
  const [filteredGames, setFilteredGames] = useState<Game[]>()

  const { data: games } = useGameListMultipleQuery({
    game_category: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
  })

  console.log('')

  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  useEffect(() => {
    startTransition(() =>
      setFilteredGames(
        provider && games
          ? games.filter((g) => g.gpc.toLowerCase() == provider)
          : games
      )
    )
  }, [provider, games])

  function onNavigate(index: number, gpc: string) {
    setProvider(gpc?.toLowerCase())
  }

  return (
    <Container>
      <Row sx={{ gap: '$3', my: '$sectionBottomSpace' }}>
        <View sx={{ flex: 3, minHeight: 300, bg: '$secondary.500' }}></View>
        <View sx={{ flex: 2, minHeight: 300, bg: '$secondary.500' }}></View>
      </Row>
      <RecentlyPlayedSection />
      {!games || filteredGames == null ? (
        <View sx={{ height: '50vh' }}>
          <ActivityIndicator color="$primary.300" size="large" />
        </View>
      ) : (
        <Row sx={{ gap: '$3', position: 'relative' }}>
          <ProviderList data={providers} onNavigateProvider={onNavigate} />(
          <View
            sx={{
              flex: 1,
              position: 'relative',
            }}
          >
            <GameSectionByProviderItem
              bordered
              gpc={provider}
              games={filteredGames}
              // GameListComponent={GameSectionByProviderItemFlashList}
            />
          </View>
        </Row>
      )}
    </Container>
  )
}

export default SlotScreen
