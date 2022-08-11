import useLocalization from 'app/provider/localization'
import {
  Currency,
  GAME_TYPE_CODE,
  SlotType,
  SlotTypeOptions,
} from 'app/utils/constant'
import { useEffect, useMemo, useState } from 'react'
import { useGameListQuery, useGetGameListQuery } from 'services/contentApi'
import { Game } from 'services/contentApi.type'
import uniqBy from 'lodash/uniqBy'
import { usePlayerProfileQuery } from 'services/playerApi'
// import groupBy from 'lodash/groupBy'
const LIMIT = 10
function useSlotGamesFilter() {
  const [allSlotGames, setAllSlotGames] = useState<Game[]>([])

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile?.data || {}

  const { data, isFetching } = useGetGameListQuery({
    currency: currency ?? Currency.VND,
    game_category: [GAME_TYPE_CODE.SLOTS],
    limit: 2000,
    offset: 0,
  })

  useEffect(() => {
    const slotGames = data?.data?.rows ?? []
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
      uniqBy(allSlotGames, 'gpc').map((g) => ({
        label: g.gpc,
        value: g.gpc,
      }))
    )
  }, [allSlotGames])
  /* Memo */
  const filteredGames = useMemo(() => {
    let result: Game[] = allSlotGames
    if (selectedProvider.value !== 'all') {
      result = allSlotGames.filter(
        (g) => g.gpc === selectedProvider.value
      ) as Game[]
    }

    if (selectedSlotType?.value && selectedSlotType?.value !== SlotType.ALL) {
      result = result.filter((s) => s.tags.includes(selectedSlotType?.value))
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
