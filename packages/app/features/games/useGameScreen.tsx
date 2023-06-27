import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import { startTransition, useEffect, useState } from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { useRouter } from 'solito/router'
import { SUB_ROUTES } from './subroutes'
import { createParam } from 'solito'

type Params = {
  type?: string
}
const { useParam } = createParam<Params>()

export default function useGameScreen(defaultType?: string) {
  const { data: games } = useGameListMultipleQuery({
    game_category: [
      GAME_TYPE_CODE.GAMES,
      GAME_TYPE_CODE.FISHING,
      GAME_TYPE_CODE.LOTTERY,
    ],
    gdc_game_category: [GDC_GAME_CATEGORY.CARDGAME],
  })

  const [filteredGames, setFilteredGames] = useState<Game[]>()
  const { push } = useRouter()

  const [type, setType] = useParam('type')
  const route = type ? SUB_ROUTES[type] : undefined
  if (!route && defaultType) setType(defaultType)

  useEffect(() => {
    if (route && route.filter && games) {
      const filtered = route.filter(games)
      startTransition(() => setFilteredGames(filtered))
    } else startTransition(() => setFilteredGames(games))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, games])

  function onFilterClicked(r, i: number) {
    if (r.filter) setType(r.route)
    else if (r.route) {
      push(r.route)
    }
  }

  return {
    filteredGames,
    route,
    type,
    onFilterClicked,
  }
}
