import { Currency, SlotType } from 'app/utils/constant'
import { useGetGameListQuery } from 'services/contentApi'
import { usePlayerProfileQuery } from 'services/playerApi'

export default function useJackpotGamesFilter() {
  /* hooks */
  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile || {}

  const { gameList } = useGetGameListQuery(
    {
      currency: currency ?? Currency.VND,
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

  return {
    gameList,
  }
}
