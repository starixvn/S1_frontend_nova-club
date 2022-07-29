import useLocalization from 'app/provider/localization'
import { Currency, SlotType, SlotTypeOptions } from 'app/utils/constant'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGameListQuery } from 'services/contentApi'
import { GameCategory, GameConfig } from 'services/contentApi.type'
import uniqBy from 'lodash/uniqBy'
// import groupBy from 'lodash/groupBy'
const LIMIT = 10
function useSlotGamesFilter() {
  const [allSlotGames, setAllSlotGames] = useState<GameConfig[]>([])

  const { data, isFetching } = useGameListQuery(
    {
      currency: Currency.VND,
      game_category: GameCategory.Slot,
    }
    // {
    //   selectFromResult: ({ data }) => ({
    //     providerGames: groupBy(data, 'game_provider_code'),
    //   }),
    // }
  )

  useEffect(() => {
    const slotGames = data?.data
    if (slotGames && slotGames.length > 0) {
      setAllSlotGames(slotGames)
    }
  }, [data?.data])

  const { t } = useLocalization()
  /* State */
  const [selectedProvider, setSelectedProvider] = useState({
    label: t('common.all'),
    value: 'all',
  })
  const [selectedSlotType, setSelectedSlotType] = useState(SlotTypeOptions[0])
  const [numOfVisible, setNumOfVisible] = useState(LIMIT)

  /* Filters */
  const slotTypeSelection = SlotTypeOptions
  const providerSelection = useMemo(() => {
    return [{ label: 'common.all', value: 'all' }].concat(
      uniqBy(allSlotGames, 'game_provider_code').map((g) => ({
        label: g.game_provider_code,
        value: g.game_provider_code,
      }))
    )
  }, [allSlotGames])

  /* Memo */
  const filteredGames = useMemo(() => {
    let result: GameConfig[] = allSlotGames
    if (selectedProvider.value !== 'all') {
      result = allSlotGames.filter(
        (g) => g.game_provider_code === selectedProvider.value
      ) as GameConfig[]
    }

    if (selectedSlotType?.value !== SlotType.ALL) {
      result = result.filter((s) => !!s[selectedSlotType?.value ?? 0])
    }

    // setNumOfVisible(LIMIT)
    return result ?? []
  }, [allSlotGames, selectedProvider, selectedSlotType])

  const displayList = useMemo(() => {
    // length.current = length.current + LIMIT

    // console.log('filter to ', length.current)
    return filteredGames.slice(0, numOfVisible)
  }, [filteredGames, numOfVisible])

  function loadMore() {
    // length.current = length.current + LIMIT
    // console.log('set to ', length.current)
    setNumOfVisible(numOfVisible + LIMIT)
  }

  return {
    providerSelection,
    slotTypeSelection,
    displayList,
    filteredGames,
    selectedProvider,
    setSelectedProvider,
    selectedSlotType,
    setSelectedSlotType,
    loadMore,
    isFetching,
  }
}

export default useSlotGamesFilter
