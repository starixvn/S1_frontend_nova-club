import { GAME_TYPE_CODE } from 'app/utils/constant'
import React, { startTransition, useEffect, useState } from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import SlotSingleProviderListing from './SlotSingleProviderListing'

type Props = {}

type Params = {
  provider?: string
}

const { useParam } = createParam<Params>()

export default function SlotByProviderScreen({}: Props) {
  const { data: games } = useGameListMultipleQuery({
    game_category: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
  })

  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [provider, setProvider] = useParam('provider')

  const { back } = useRouter()

  useEffect(() => {
    if (games) {
      const providerGames = games.filter(
        (g) => g.gpc.toLowerCase() === provider
      )

      startTransition(() => setFilteredGames(providerGames))
    }
  }, [games, provider])

  return (
    <SlotSingleProviderListing
      games={filteredGames}
      provider={provider}
      onBack={back}
    />
  )
}
