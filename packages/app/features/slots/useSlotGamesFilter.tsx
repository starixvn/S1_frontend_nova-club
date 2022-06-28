import AllSlotGames from 'app/config/games/slots/all'
import { SlotGame } from 'app/config/games/slots/slot.type'
import { useMemo, useState } from 'react'

function useSlotGamesFilter() {
  /* State */
  const [selectedProvider, setSelectedProvider] = useState('all')
  const [selectedSlotType, setSelectedSlotType] = useState('all')

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
      console.log('selected', selectedProvider, AllSlotGames[selectedProvider])
      result = AllSlotGames[selectedProvider] as SlotGame[]
    }

    if (selectedSlotType !== 'all') {
      result = result.filter((s) => !!s[selectedSlotType])
    }

    console.log('result, ', result)
    return result
  }, [selectedProvider, selectedSlotType, allSlotGames])

  return {
    providerSelection,
    slotTypeSelection,
    filteredGames,
    selectedProvider,
    setSelectedProvider,
    selectedSlotType,
    setSelectedSlotType,
  }
}

export default useSlotGamesFilter
