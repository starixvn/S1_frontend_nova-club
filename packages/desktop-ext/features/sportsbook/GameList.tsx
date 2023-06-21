import GameCard from 'app/components/game/GameCard'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { GameToLaunchPayload } from 'app/utils/game'
import { ScrollView } from 'dripsy'
import React from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'

export default function GameList({}) {
  const locale = useAppSelector((s) => s.setting.locale)
  const { data } = useGetGameListByCategoryQuery([
    GAME_TYPE_CODE.SPORTS,
    GAME_TYPE_CODE.E_SPORTS,
    GAME_TYPE_CODE.VIRTUAL_SPORTS,
  ])

  return (
    <ScrollView
      horizontal
      sx={{}}
      contentContainerSx={{
        p: '$layoutSpace',
        pr: 0,
      }}
    >
      {data?.map((item) => {
        const { name, gc, gpc } = item
        const formattedName = name
          ? typeof name === 'string'
            ? name
            : name[locale]
          : undefined

        const launchPayload = GameToLaunchPayload(item, locale)
        return (
          <GameCard
            sx={{ height: 200, mr: '$layoutSpace' }}
            key={gc + gpc}
            name={formattedName}
            {...launchPayload}
          />
        )
      })}
    </ScrollView>
  )
}
