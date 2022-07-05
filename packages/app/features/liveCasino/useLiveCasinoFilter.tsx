import AllLiveCasinoGames from 'app/config/games/liveCasino'
import { GameConfig } from 'app/global'
import useLocalization from 'app/provider/localization'
import { LiveCasinoGenreOptions } from 'app/utils/constant'
import { useMemo, useState } from 'react'

export default function useLiveCasinoFilter(
  gamesByProvider = AllLiveCasinoGames
) {
  const { t } = useLocalization()
  const defaultProviderSelection = useMemo(
    () => ({
      label: t('common.all'),
      value: 'all',
    }),
    [t]
  )

  /* State */
  const [selectedProvider, setSelectedProvider] = useState(
    defaultProviderSelection
  )
  const [selectedGenre, setSelectedGenre] = useState(LiveCasinoGenreOptions[0])

  /* Filters */
  const genreSelection = LiveCasinoGenreOptions
  const providerSelection = useMemo(() => {
    return [defaultProviderSelection].concat(
      Object.keys(AllLiveCasinoGames).map((k) => ({
        label: k.toUpperCase(),
        value: k,
      }))
    )
  }, [defaultProviderSelection])

  /* Memo */
  const allGames = useMemo(() => {
    return (
      Object.keys(AllLiveCasinoGames) as (keyof typeof AllLiveCasinoGames)[]
    ).reduce((acc, cur) => acc.concat(gamesByProvider[cur]), [])
  }, [gamesByProvider])

  const filteredGames = useMemo(() => {
    let result: GameConfig[] = allGames
    if (selectedProvider.value !== 'all') {
      result = gamesByProvider[selectedProvider.value] as GameConfig[]
    }

    if (selectedGenre?.value !== 'all') {
      result = result.filter((s) => !!s[selectedGenre?.value ?? 0])
    }

    return result ?? []
  }, [allGames, selectedProvider.value, selectedGenre?.value, gamesByProvider])

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
