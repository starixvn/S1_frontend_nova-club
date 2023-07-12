import { FlashList } from '@shopify/flash-list'
import GameCard from 'app/components/game/GameCard'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import React, { startTransition, useEffect, useState } from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import GamesScreenSingleProvider from './GamesSingleProviderListing'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { SUB_ROUTES } from './subroutes'
import { View } from 'dripsy'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

type Props = {}

type Params = {
  provider?: string
}

const { useParam } = createParam<Params>()

export default function GamesByProviderScreen({}: Props) {
  const { data: games } = useGameListMultipleQuery({
    game_category: [
      GAME_TYPE_CODE.GAMES,
      GAME_TYPE_CODE.FISHING,
      GAME_TYPE_CODE.LOTTERY,
    ],
    gdc_game_category: [GDC_GAME_CATEGORY.CARDGAME],
  })

  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [type, setType] = useState<string>()
  const [provider, setProvider] = useParam('provider')

  const { back } = useRouter()

  function onFilterClicked(route, i: number) {
    setType(route.route)
  }

  useEffect(() => {
    if (games) {
      const providerGames = games.filter(
        (g) => g.gpc.toLowerCase() === provider
      )
      const route = type ? SUB_ROUTES[type] : undefined
      if (route) {
        const filtered = route.filter(providerGames)
        startTransition(() => setFilteredGames(filtered))
      } else startTransition(() => setFilteredGames(providerGames))
    }
  }, [games, type, provider])

  return (
    <GamesScreenSingleProvider
      games={filteredGames}
      type={type}
      provider={provider}
      onBack={back}
      onFilterClicked={onFilterClicked}
    />
  )
}
