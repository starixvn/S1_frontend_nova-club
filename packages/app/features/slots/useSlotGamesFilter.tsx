import AllSlotGames from 'app/config/games/slots'
import { SlotGame } from 'app/config/games/slots/slot.type'
import useLocalization from 'app/provider/localization'
import { SlotType, SlotTypeOptions } from 'app/utils/constant'
import { useMemo, useRef, useState } from 'react'
const LIMIT = 10
function useSlotGamesFilter() {
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
    return [{ label: 'All', value: 'all' }].concat(
      Object.keys(AllSlotGames).map((k) => ({
        label: k.toUpperCase(),
        value: k,
      }))
    )
  }, [])

  /* Memo */
  const allSlotGames = useMemo(() => {
    return (Object.keys(AllSlotGames) as (keyof typeof AllSlotGames)[]).reduce(
      (acc, cur) => acc.concat(AllSlotGames[cur]),
      []
    )
  }, [])

  const filteredGames = useMemo(() => {
    let result: SlotGame[] = allSlotGames
    if (selectedProvider.value !== 'all') {
      result = AllSlotGames[selectedProvider.value] as SlotGame[]
    }

    if (selectedSlotType?.value !== SlotType.ALL) {
      result = result.filter((s) => !!s[selectedSlotType?.value ?? 0])
    }

    setNumOfVisible(LIMIT)
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
  }
}

export default useSlotGamesFilter
