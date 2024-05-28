import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'utils/constant'
import { startTransition, useEffect, useState } from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { useRouter } from 'solito/router'
import { Route_GameCategory, SUB_ROUTES } from './subroutes'
import { createParam } from 'solito'
import useGameCategoryTag from 'app/hooks/appState/game/useGameCategoryTag'
import { useAppSelector } from 'app/provider/redux/store'

type Params = {
  type?: string[]
}
const { useParam } = createParam<Params>()

const GameCategory = [
  GAME_TYPE_CODE.GAMES,
  GAME_TYPE_CODE.FISHING,
  GAME_TYPE_CODE.LOTTERY,
  GAME_TYPE_CODE.COCKFIGHTING,
]

export default function useGameScreen(defaultType?: string) {
  const currency = useAppSelector((s) => s.setting.currency)
  const { data: games } = useGameListMultipleQuery({
    currency,
    game_category: GameCategory,
    gdc_game_category: [GDC_GAME_CATEGORY.CARDGAME],
  })

  const [filteredGames, setFilteredGames] = useState<Game[]>()
  const { push } = useRouter()

  const [type, setType] = useParam('type', {
    parse: (templateFromUrl) =>
      templateFromUrl && templateFromUrl[0] ? templateFromUrl[0] : undefined,
    initial: undefined,
  })

  const [provider, setProvider] = useParam('type', {
    parse: (templateFromUrl) =>
      templateFromUrl && templateFromUrl[1] ? templateFromUrl[1] : undefined,
    initial: undefined,
  })

  const route = type ? SUB_ROUTES[type] : undefined
  if (!route && defaultType) setType(defaultType)

  const gameCategoryTagTranslation = useGameCategoryTag(
    Route_GameCategory[type ?? defaultType ?? GAME_TYPE_CODE.GAMES]
  )

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
    provider,
    type,
    onFilterClicked,
    gameCategoryTagTranslation,
  }
}
