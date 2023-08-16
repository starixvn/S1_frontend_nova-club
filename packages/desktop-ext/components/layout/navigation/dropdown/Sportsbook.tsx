import GameCard from 'app/components/game/GameCard'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import React from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import DropdownContent from '../DropdownContent'
import {
  NAVIGATION_DROPDOWN_MENU,
  useNavigationHeader,
} from '../NavigationHeaderProvider'

type Props = {}

export default function Sportsbook({}: Props) {
  const { data } = useGetGameListByCategoryQuery([
    GAME_TYPE_CODE.SPORTS,
    GAME_TYPE_CODE.E_SPORTS,
    GAME_TYPE_CODE.VIRTUAL_SPORTS,
  ])
  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <DropdownContent menu={NAVIGATION_DROPDOWN_MENU.Sportsbook}>
      {data &&
        data.map((g) => {
          return (
            <GameCard
              absoluteName
              // displayName={g.name[locale]}
              key={g.gc + g.gpc}
              sx={{ width: '11%' }}
              {...g}
              // img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/main/${g.gpc?.toLowerCase()}.png`}
            />
          )
        })}
    </DropdownContent>
  )
}
