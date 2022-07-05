import AllLiveCasinoGames from 'app/config/games/liveCasino'
import useLocalization from 'app/provider/localization'
import { Currency, LiveCasinoGenreOptions } from 'app/utils/constant'
import { useEffect, useMemo, useState } from 'react'
import { useGameListQuery } from 'services/contentApi'
import { GameCategory, GameConfig } from 'services/contentApi.type'
import uniqBy from 'lodash/uniqBy'

export default function useFishingGamesFilter() {
  /* hooks */
  const { t } = useLocalization()
  const { data } = useGameListQuery({
    currency: Currency.VND,
    game_category: GameCategory.Fishing,
  })

  /* State */
  const [allGames, setAllGames] = useState<GameConfig[]>([])

  useEffect(() => {
    const games = data?.data
    if (games && games.length > 0) {
      setAllGames(games)
    }
  }, [data?.data])

  return {
    allGames,
  }
}
