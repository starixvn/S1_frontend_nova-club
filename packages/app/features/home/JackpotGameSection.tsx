import GameListSection from 'app/components/game/GameListSection'
import { Currency, SlotType } from 'app/utils/constant'
import React from 'react'
import { useGetGameListQuery } from 'services/gameApi'

export default function JackpotGameSection() {
  const { gameList = [] } = useGetGameListQuery(
    {
      currency: Currency.VND,
      game_category: [],
      limit: 20,
      offset: 0,
      gdc_game_category: [],
      gdc_tag: [SlotType.JACKPOT],
    },
    {
      selectFromResult: ({ data }) => ({
        gameList: data?.data?.rows || [],
      }),
    }
  )

  return <GameListSection data={gameList} icon="sl" title="JACKPOT" />
}
