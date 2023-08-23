import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import GameCard from 'app/components/game/GameCard'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import groupBy from 'lodash/groupBy'
import React, { useMemo } from 'react'
import {
  useGameProviderListQuery,
  useGetGameListByCategoryQuery,
} from 'services/gameApi'
import { useRouter } from 'solito/router'
import DropdownContent from '../DropdownContent'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'
import useGameRebateValue from 'app/hooks/useGameRebateValue'
import { uniqBy } from 'lodash'

type Props = {}

export default function LiveCasino({}: Props) {
  const { push } = useRouter()

  const { data } = useGetGameListByCategoryQuery([GAME_TYPE_CODE.LIVE_DEALER])
  const { data: providerStatus } = useGameProviderListQuery()

  const providers = useMemo(() => {
    if (data)
      return uniqBy(
        data.map(({ gtc, gpc }) => ({ gtc, gpc })),
        'gpc'
      )
    else return []
  }, [data])

  const { GetCommissionList, GetRebate } = useGameRebateValue()
  const commissionList = GetCommissionList()

  return (
    <DropdownContent data={data} menu={NAVIGATION_DROPDOWN_MENU.LiveCasino}>
      {providers &&
        providers.map((g) => {
          return (
            <GameCard
              rebateText={GetRebate({
                gtc: g.gtc,
                gpc: g.gpc,
                commissionList,
              })}
              showRebate={true}
              onPress={() => push(`/livecasino/${g.gpc.toLowerCase()}`)}
              // displayName={
              //   providerStatus ? providerStatus[g]?.system_name : undefined
              // }
              key={g.gpc}
              sx={{ width: '11%' }}
              img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/main/${g.gpc.toLowerCase()}.png`}
            />
          )
        })}
    </DropdownContent>
  )
}
