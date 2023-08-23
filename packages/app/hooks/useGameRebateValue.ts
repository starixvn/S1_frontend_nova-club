import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import { useCallback } from 'react'
import { useCommissionTableQuery } from 'services/contentApi'
import { CommissionTableResult } from 'services/contentApi.type'

//gtc = game_type_code
//sc = system_code || gameProviderCode gpc∏

export interface GameProviderCategory {
  gpc: string
  gtc: GAME_TYPE_CODE | string
}
interface GetRebateProps extends GameProviderCategory {
  commissionList: CommissionTableResult[]
}

const useGameRebateValue = () => {
  const GetCommissionList = () => {
    const { commissionList } = useCommissionTableQuery(
      { currency: Currency.VND },
      {
        selectFromResult: ({ data }) => ({
          commissionList: data?.data,
        }),
      }
    )

    const parseCommissionList =
      commissionList?.slice(1).filter((item) => {
        return item.system_code === '' ||
          (item.cash_player > 0 &&
            item.cash_player_referrer > 0 &&
            item.cash_agent > 0)
          ? item
          : null
      }) ?? []

    return parseCommissionList
  }

  const GetRebate = useCallback(
    ({ gtc, gpc, commissionList }: GetRebateProps) => {
      if (commissionList) {
        const item = commissionList.find(
          (item) => item.game_type_code === gtc && item.system_code === gpc
        )
        return item?.cash_player.toString()
      }
      return undefined
    },
    []
  )
  return { GetCommissionList, GetRebate }
}
export default useGameRebateValue
