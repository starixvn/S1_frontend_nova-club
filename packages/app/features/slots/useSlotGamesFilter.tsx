import AllSlotGames from 'app/config/games/slots/all'
import { SlotGame } from 'app/config/games/slots/slot.type'
import { useMemo, useRef, useState } from 'react'
const LIMIT = 10
function useSlotGamesFilter() {
  /* State */
  const [selectedProvider, setSelectedProvider] = useState('all')
  const [selectedSlotType, setSelectedSlotType] = useState('all')
  const [numOfVisible, setNumOfVisible] = useState(LIMIT)
  const length = useRef(0)

  /* Filters */
  const slotTypeSelection = ['all', 'new', 'hot']
  const providerSelection = useMemo(() => {
    return Object.keys(AllSlotGames)
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
    if (selectedProvider !== 'all') {
      result = AllSlotGames[selectedProvider] as SlotGame[]
    }

    if (selectedSlotType !== 'all') {
      result = result.filter((s) => !!s[selectedSlotType])
    }

    setNumOfVisible(LIMIT)
    return result
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
