import { GDC_GAME_CATEGORY } from 'app/utils/constant'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { useGameListMultipleQuery, useGetGameListQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'

const GameFilterContext = createContext<{
  games: Game[]
  filteredGames: Game[]
}>({
  games: [],
  filteredGames: [],
})

export interface GameProviderProps {
  children: ReactNode
  gameTypes?: GAME_TYPE_CODE[]
  gameCategories?: GDC_GAME_CATEGORY[]
}

export const selectAllGame = (s) => s.games

export const selectByGameType = (
  games: Game[],
  gameTypes: GAME_TYPE_CODE[]
) => {
  console.log('selecting game type')
  return games.filter((game) => gameTypes.includes(game.gtc))
}

export const selectByProvider = (games: Game[], provider: string) => {
  console.log('selecting by provider')
  return games.filter((g) => g.gpc === provider)
}

export const selectByCategories = (
  games: Game[],
  gameCategories: GDC_GAME_CATEGORY[]
) =>
  games.filter(
    (game) =>
      game.gdc_cat && gameCategories.includes(game.gdc_cat as GDC_GAME_CATEGORY)
  )

const GameFilterProvider = ({
  children,
  gameTypes,
  gameCategories,
}: GameProviderProps) => {
  const [filteredGames, setFilteredGames] = useState<Game[]>([])

  const { data: games = [] } = useGameListMultipleQuery({
    game_category: gameTypes,
    gdc_game_category: gameCategories,
  })

  console.log('games', games.length)
  return (
    <GameFilterContext.Provider
      value={{ games, filteredGames, setFilteredGames }}
    >
      {children}
    </GameFilterContext.Provider>
  )
}

export const useGameFilter = () => {
  const context = useContext(GameFilterContext)

  return {
    ...context,
  }
}

export default GameFilterProvider
