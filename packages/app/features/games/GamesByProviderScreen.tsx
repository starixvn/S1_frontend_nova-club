import { GetCommissionList } from 'app/components/game/GameUtilityAction'
import useGameCategoryTag from 'app/hooks/appState/game/useGameCategoryTag'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import React, { startTransition, useEffect, useState } from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import GamesSingleProviderListing from './GamesSingleProviderListing'
import { SUB_ROUTES } from './subroutes'

type Props = {}

type Params = {
  provider?: string
  tag?: string
}

const { useParam } = createParam<Params>()

const GameCategory = [
  GAME_TYPE_CODE.GAMES,
  GAME_TYPE_CODE.FISHING,
  GAME_TYPE_CODE.LOTTERY,
]

export default function GamesByProviderScreen({}: Props) {
  const { data: games } = useGameListMultipleQuery({
    game_category: GameCategory,
    gdc_game_category: [GDC_GAME_CATEGORY.CARDGAME],
  })
  const commissionList = GetCommissionList()
  const { gameCategoryTagTranslation } = useGameCategoryTag(GameCategory)

  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [type, setType] = useState<string>()
  const [provider, setProvider] = useParam('provider')
  const [tag, setTag] = useParam('tag')

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
  // console.log('type:', type, '----', type == '/games' || type === undefined)
  return (
    <GamesSingleProviderListing
      games={filteredGames}
      showRebate={!(type === '/games' || type == undefined)}
      tag={tag ?? 'ALL'}
      commissionList={commissionList}
      type={type}
      provider={provider}
      onBack={back}
      onFilterClicked={onFilterClicked}
      gameCategoryTagTranslation={gameCategoryTagTranslation}
    />
  )
}
