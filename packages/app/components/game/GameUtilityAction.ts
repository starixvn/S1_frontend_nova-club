import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import { useCommissionTableQuery } from 'services/contentApi'
import { CommissionTableResult } from 'services/contentApi.type'

export interface GameProviderCategory {
  gpc: string
  gtc: GAME_TYPE_CODE | string
}
interface GetRebateProps extends GameProviderCategory {
  commissionList: CommissionTableResult[]
}

export const GetGameRebateValue = ({
  gtc,
  gpc,
  commissionList,
}: GetRebateProps) => {
  if (commissionList) {
    const item = commissionList.find(
      (item) => item.game_type_code === gtc && item.system_code === gpc
    )
    return item?.cash_player.toString()
  }
  return undefined
}

export const GetCommissionList = () => {
  const { data } = useCommissionTableQuery({
    currency: Currency.VND,
  })
  return data ?? []
}
