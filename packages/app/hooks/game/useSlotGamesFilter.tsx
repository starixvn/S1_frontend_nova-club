import { FlashList } from '@shopify/flash-list'
import { getProviderLogo } from 'app/config/games/provider'
import { OPTIONS_ALL } from 'app/constant/actionSheet'
import useLocalization from 'app/provider/localization'
import {
  Currency,
  GAME_TYPE_CODE,
  SlotType,
  SlotTypeOptions,
} from 'app/utils/constant'
import uniqBy from 'lodash/uniqBy'
import { MutableRefObject, useEffect, useMemo, useState } from 'react'
import { useGetGameListQuery } from 'services/contentApi'
import { Game } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
// import groupBy from 'lodash/groupBy'
const LIMIT = 10

function useSlotGamesFilter(
  verticalList: MutableRefObject<FlashList<Game> | null>
) {
  const [allSlotGames, setAllSlotGames] = useState<Game[]>([])

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile || {}

  const { data, isFetching } = useGetGameListQuery({
    currency: currency ?? Currency.VND,
    game_category: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
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
  const [selectedProvider, setSelectedProvider] = useState(OPTIONS_ALL)
  const [selectedSlotType, setSelectedSlotType] = useState(SlotTypeOptions[0])
  const [numOfVisible, setNumOfVisible] = useState(LIMIT)

  /* Filters */
  const slotTypeSelection = SlotTypeOptions
  const providerSelection = useMemo(() => {
    return [OPTIONS_ALL].concat(
      uniqBy(allSlotGames, 'gpc').map((g) => ({
        label: g.gpc,
        value: g.gpc,
        icon: getProviderLogo(g.gpc),
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

    // if (verticalList.current) {
    //   verticalList.current.prepareForLayoutAnimationRender()
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    // }
    return result ?? []
  }, [allSlotGames, selectedProvider, selectedSlotType])

  // const displayList = useMemo(() => {
  //   // length.current = length.current + LIMIT

  //   // console.log('filter to ', length.current)
  //   return filteredGames.slice(0, numOfVisible)
  // }, [filteredGames, numOfVisible])

  // function loadMore() {
  //   // length.current = length.current + LIMIT
  //   // console.log('set to ', length.current)
  //   setNumOfVisible(numOfVisible + LIMIT)
  // }

  return {
    providerSelection,
    slotTypeSelection,
    // displayList,
    filteredGames,
    selectedProvider,
    setSelectedProvider,
    selectedSlotType,
    setSelectedSlotType,
    // loadMore,
    isFetching,
  }
}

export default useSlotGamesFilter
