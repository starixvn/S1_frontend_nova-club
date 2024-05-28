import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'utils/constant'
import groupBy from 'lodash/groupBy'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { createParam } from 'solito'
import { useAppSelector } from '../redux/store'

const GameFilterContext = createContext<{
  games: Game[]
  filteredGames?: Game[]
  gamesByProviders: Record<string, Game[]>
  filterKey?: string
  setFilteredGames: (games: Game[], key: String) => void
}>({
  games: [],
  gamesByProviders: {},
  setFilteredGames: (g, k) => {},
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

type Params = {
  provider?: string
}
const { useParam } = createParam<Params>()

const GameFilterProvider = ({
  children,
  gameTypes,
  gameCategories,
}: GameProviderProps) => {
  const [provider] = useParam('provider')
  const [filteredGames, _setFilteredGames] = useState<Game[]>()
  const [filterKey, setFilterKey] = useState<string | undefined>(provider)
  const [isPending, startTransition] = useTransition()

  const currency = useAppSelector((s) => s.setting.currency)

  const { data: games } = useGameListMultipleQuery({
    currency,
    game_category: gameTypes,
    gdc_game_category: gameCategories,
  })

  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  function setFilteredGames(g, keyIndicator?) {
    setFilterKey(keyIndicator)

    startTransition(() => {
      _setFilteredGames(g)
    })
  }

  useEffect(() => {
    if (games && games.length > 0 && !filteredGames) {
      setFilteredGames(games)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games])

  return (
    <GameFilterContext.Provider
      value={{
        games,
        filteredGames,
        filterKey,
        setFilteredGames,
        gamesByProviders,
      }}
    >
      {children}
    </GameFilterContext.Provider>
  )
}

export function withGameFilterProvider(
  WrappedComponent,
  setting: Omit<GameProviderProps, 'children'>
) {
  const WithShareComponent = (props) => {
    return (
      <GameFilterProvider {...setting}>
        <WrappedComponent {...props} />
      </GameFilterProvider>
    )
  }

  return WithShareComponent
}

export const useGameFilter = () => {
  const context = useContext(GameFilterContext)

  return {
    ...context,
  }
}

export default GameFilterProvider
