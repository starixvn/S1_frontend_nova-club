import GameCard from 'app/components/game/GameCard'
import {
  GetCommissionList,
  GetGameRebateValue,
} from 'app/components/game/GameUtilityAction'
import uniqBy from 'lodash/uniqBy'
import React, { useMemo } from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { GAME_TYPE_CODE } from 'utils/constant'
import DropdownContent from '../DropdownContent'
import { NAVIGATION_DROPDOWN_MENU } from '../NavigationHeaderProvider'
import { useAppSelector } from 'app/provider/redux/store'
import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'

type Props = {}

export default function Sportsbook({}: Props) {
  const { locale, currency } = useDefaultParamSelector()
  const { data } = useGetGameListByCategoryQuery({
    currency,
    categories: [
      GAME_TYPE_CODE.SPORTS,
      GAME_TYPE_CODE.E_SPORTS,
      GAME_TYPE_CODE.VIRTUAL_SPORTS,
    ],
  })

  const commissionList = GetCommissionList()

  const providers = useMemo(() => {
    if (data) return uniqBy(data, (d) => [d.gpc, d.gtc].join())
    else return []
  }, [data])

  return (
    <DropdownContent menu={NAVIGATION_DROPDOWN_MENU.Sportsbook}>
      {providers &&
        providers.map((g) => {
          return (
            <GameCard
              // absoluteName
              rebateText={GetGameRebateValue({
                gtc: g.gtc,
                gpc: g.gpc,
                commissionList,
              })}
              showRebate={true}
              rebateTop
              // displayName={g.name[locale]}
              key={g.gc + g.gpc}
              sx={{ width: ['9%', '9%', '9%', '9%', '10%'] }}
              isDropdownContent
              {...g}
              img={g.img[locale]}
              xImg={g.xImg?.[locale]}
            />
          )
        })}
    </DropdownContent>
  )
}
