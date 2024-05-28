import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import GameCard from 'app/components/game/GameCard'
import { GetGameRebateValue } from 'app/components/game/GameUtilityAction'
import uniqBy from 'lodash/uniqBy'
import React, { useMemo } from 'react'
import { useCommissionTableQuery } from 'services/contentApi'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { useRouter } from 'solito/router'
import { GAME_TYPE_CODE } from 'utils/constant'
import DropdownContent from '../DropdownContent'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'
import { useAppSelector } from 'app/provider/redux/store'

type Props = {}

export default function LiveCasino({}: Props) {
  const { push } = useRouter()
  const currency = useAppSelector((s) => s.setting.currency)
  const { data: commissionList } = useCommissionTableQuery({ currency })

  const { data } = useGetGameListByCategoryQuery({
    currency,
    categories: [GAME_TYPE_CODE.LIVE_DEALER],
  })
  // const { data: providerStatus } = useGameProviderListQuery()

  const providers = useMemo(() => {
    if (data)
      return uniqBy(
        data.map(({ gtc, gpc }) => ({ gtc, gpc })),
        'gpc'
      )
    else return []
  }, [data])

  return (
    <DropdownContent data={data} menu={NAVIGATION_DROPDOWN_MENU.LiveCasino}>
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
              onPress={() => push(`/livecasino/${g.gpc.toLowerCase()}`)}
              // displayName={
              //   providerStatus ? providerStatus[g]?.system_name : undefined
              // }
              key={g.gpc}
              sx={{ width: ['9%', '9%', '9%', '9%', '10%'] }}
              img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/gameV2/provider/main/${g.gpc.toLowerCase()}.png`}
              isDropdownContent
              {...g}
              xImg={undefined}
            />
          )
        })}
    </DropdownContent>
  )
}
