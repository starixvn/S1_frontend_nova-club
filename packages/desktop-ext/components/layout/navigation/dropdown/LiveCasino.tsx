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

type Props = {}

export default function LiveCasino({}: Props) {
  const { push } = useRouter()

  const { data } = useGetGameListByCategoryQuery([GAME_TYPE_CODE.LIVE_DEALER])
  const { data: providerStatus } = useGameProviderListQuery()

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
              absoluteName
              onPress={() => push(`/livecasino/${g.toLowerCase()}`)}
              // displayName={
              //   providerStatus ? providerStatus[g]?.system_name : undefined
              // }
              key={g}
              sx={{ width: '11%' }}
              img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/main/${g.toLowerCase()}.png`}
            />
          )
        })}
    </DropdownContent>
  )
}
