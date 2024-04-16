import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import GameCard from 'app/components/game/GameCard'
import {
  GetGameRebateValue
} from 'app/components/game/GameUtilityAction'
import { useAppSelector } from 'app/provider/redux/store'
import uniqBy from 'lodash/uniqBy'
import React, { useMemo } from 'react'
import { useCommissionTableQuery } from 'services/contentApi'
import { useGameListMultipleQuery } from 'services/gameApi'
import { useRouter } from 'solito/router'
import { GAME_TYPE_CODE } from 'utils/constant'
import DropdownContent from '../DropdownContent'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'

type Props = {}

export default function Slots({}: Props) {
  const { push } = useRouter()
  // const { data } = useGetGameListByCategoryQuery([
  //   GAME_TYPE_CODE.SLOTS,
  //   GAME_TYPE_CODE.FISHING,
  // ])

  const currency = useAppSelector((s) => s.setting.currency)
  const { data: commissionList } = useCommissionTableQuery({ currency })

  const { data } = useGameListMultipleQuery({
    currency,
    game_category: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
  })

  const providers = useMemo(() => {
    if (data) {
      console.log('data', data)
      return uniqBy(
        data.map(({ gtc, gpc }) => ({ gtc, gpc })),
        'gpc'
      )
    } else return []
  }, [data])

  return (
    <DropdownContent data={data} menu={NAVIGATION_DROPDOWN_MENU.Slots}>
      {providers &&
        providers.map((g) => {
          return (
            <GameCard
              rebateText={GetGameRebateValue({
                gtc: g.gtc,
                gpc: g.gpc,
                commissionList,
              })}
              showRebate={true}
              rebateTop
              onPress={() => push(`/slots/${g.gpc.toLowerCase()}`)}
              // displayName={
              //   providerStatus ? providerStatus[g]?.system_name : undefined
              // }
              key={g.gpc}
              sx={{ width: ['9%', '9%', '9%', '9%', '10%'] }}
              img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/gameV2/provider/slots/${g.gpc.toLowerCase()}.png`}
              isDropdownContent
            />
          )
        })}
    </DropdownContent>
  )
}
