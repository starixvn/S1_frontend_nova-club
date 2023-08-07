import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import GameCard from 'app/components/game/GameCard'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import groupBy from 'lodash/groupBy'
import React, { useMemo } from 'react'
import {
  useGameListMultipleQuery,
  useGameProviderListQuery,
  useGetGameListByCategoryQuery,
} from 'services/gameApi'
import { useRouter } from 'solito/router'
import DropdownContent from '../DropdownContent'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'

type Props = {}

export default function Slots({}: Props) {
  const { push } = useRouter()

  // const { data } = useGetGameListByCategoryQuery([
  //   GAME_TYPE_CODE.SLOTS,
  //   GAME_TYPE_CODE.FISHING,
  // ])
  const { data: providerStatus } = useGameProviderListQuery(undefined, {})

  const { data } = useGameListMultipleQuery({
    game_category: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
  })

  const providers = useMemo(() => {
    if (data) return Object.keys(groupBy(data, 'gpc'))
    else return []
  }, [data])

  return (
    <DropdownContent data={data} menu={NAVIGATION_DROPDOWN_MENU.Slots}>
      {providers &&
        providers.map((g) => {
          return (
            <GameCard
              absoluteName
              onPress={() => push(`/slots/${g.toLowerCase()}`)}
              // displayName={
              //   providerStatus ? providerStatus[g]?.system_name : undefined
              // }
              key={g}
              sx={{ width: '11%' }}
              img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/slots/${g.toLowerCase()}.png`}
            />
          )
        })}
    </DropdownContent>
  )
}
