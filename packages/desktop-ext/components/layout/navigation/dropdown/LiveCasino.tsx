import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import GameCard from 'app/components/game/GameCard'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import groupBy from 'lodash/groupBy'
import React, { useMemo } from 'react'
import {
  useCommissionTableQuery,
  useGetMaintenanceQuery,
} from 'services/contentApi'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { useRouter } from 'solito/router'
import DropdownContent from '../DropdownContent'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'

type Props = {}

export default function LiveCasino({}: Props) {
  const { data } = useGetGameListByCategoryQuery([GAME_TYPE_CODE.LIVE_DEALER])
  // const { data: wallet } = useCommissionTableQuery(
  //   { currency: Currency.VND },
  //   {
  //     selectFromResult: (resp) => {
  //       return {
  //         ...resp,
  //         providers: resp.data?.code,
  //       }
  //     },
  //   }
  // )
  // console.log('wallet', wallet)
  const { push } = useRouter()
  const providers = useMemo(() => {
    if (data) return Object.keys(groupBy(data, 'gpc'))
    else return []
  }, [data])

  return (
    <DropdownContent data={data} menu={NAVIGATION_DROPDOWN_MENU.LiveCasino}>
      {providers &&
        providers.map((g) => {
          return (
            <GameCard
              onPress={() => push(`/livecasino/${g.toLowerCase()}`)}
              // displayName={g.name[locale]}
              key={g}
              sx={{ width: '11%' }}
              img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/main/${g.toLowerCase()}.png`}
            />
          )
        })}
    </DropdownContent>
  )
}
