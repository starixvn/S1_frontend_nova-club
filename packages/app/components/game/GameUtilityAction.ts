import { CommissionTableResult } from 'services/contentApi.type'
import { GAME_TYPE_CODE } from 'utils/constant'

export interface GameProviderCategory {
  gpc: string
  gtc: GAME_TYPE_CODE | string
}
interface GetRebateProps extends GameProviderCategory {
  commissionList?: CommissionTableResult[]
}

export const GetGameRebateValue = ({
  gtc,
  gpc,
  commissionList,
}: GetRebateProps) => {
  if (commissionList) {
    const item = commissionList?.find(
      (item) => item.game_type_code === gtc && item.system_code === gpc
    )
    return ((item?.cash_player ?? 0) + (item?.cash_player_referrer ?? 0))
      .toFixed(2)
      .toString()
  }
  return undefined
}
