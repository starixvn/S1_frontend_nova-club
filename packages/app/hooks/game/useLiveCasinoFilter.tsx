import AllLiveCasinoGames from 'app/config/games/liveCasino'
import useLocalization from 'app/provider/localization'
import { Currency, LiveCasinoGenreOptions } from 'app/utils/constant'
import { useEffect, useMemo, useState } from 'react'
import { useGameListQuery } from 'services/contentApi'
import { GameCategory, GameConfig } from 'services/contentApi.type'
import uniqBy from 'lodash/uniqBy'

export default function useLiveCasinoFilter() {
  /* hooks */
  const { t } = useLocalization()
  const defaultProviderSelection = useMemo(
    () => ({
      label: t('common.all'),
      value: 'all',
    }),
    [t]
  )
  const { data } = useGameListQuery({
    currency: Currency.VND,
    game_category: GameCategory.LiveCasino,
  })

  useEffect(() => {
    const games = data?.data
    if (games && games.length > 0) {
      setAllGames(games)
    }
  }, [data?.data])

  /* State */
  const [allGames, setAllGames] = useState<GameConfig[]>([])
  const [selectedProvider, setSelectedProvider] = useState(
    defaultProviderSelection
  )
  const [selectedGenre, setSelectedGenre] = useState(LiveCasinoGenreOptions[0])

  /* Filters */
  const genreSelection = LiveCasinoGenreOptions
  const providerSelection = useMemo(() => {
    return [defaultProviderSelection].concat(
      uniqBy(allGames, 'game_provider_code').map((g) => ({
        label: g.game_provider_code,
        value: g.game_provider_code,
      }))
    )
  }, [allGames, defaultProviderSelection])

  const filteredGames = useMemo(() => {
    let result: GameConfig[] = allGames
    if (selectedProvider.value !== 'all') {
      result = allGames.filter(
        (g) => g.game_provider_code === selectedProvider.value
      ) as GameConfig[]
    }

    if (selectedGenre?.value !== 'all') {
      result = result.filter((s) => !!s[selectedGenre?.value ?? 0])
    }

    return result ?? []
  }, [allGames, selectedProvider.value, selectedGenre?.value])

  return {
    providerSelection,
    genreSelection,
    filteredGames,
    selectedProvider,
    setSelectedProvider,
    selectedGenre,
    setSelectedGenre,
  }
}
