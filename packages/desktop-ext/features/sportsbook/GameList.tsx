import GameCard from 'app/components/game/GameCard'
import useGameRebateValue from 'app/hooks/useGameRebateValue'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { Row } from 'dripsy'
import React from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'

export default function GameList({}) {
  const locale = useAppSelector((s) => s.setting.locale)
  const { data } = useGetGameListByCategoryQuery([
    GAME_TYPE_CODE.SPORTS,
    GAME_TYPE_CODE.E_SPORTS,
    GAME_TYPE_CODE.VIRTUAL_SPORTS,
  ])

  const { GetCommissionList, GetRebate } = useGameRebateValue()
  const commissionList = GetCommissionList()
  return (
    <Row
      sx={{
        width: '100%',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: ['$3', '$4'],
        py: ['$3', '$4'],
      }}
    >
      {data?.map((g) => {
        return (
          <GameCard
            showRebate={true}
            rebateText={GetRebate({
              gtc: g.gtc,
              gpc: g.gpc,
              commissionList,
            })}
            absoluteName
            displayName={g.name[locale]}
            key={g.gc + g.gpc}
            sx={{ width: '11%' }}
            {...g}
          />
        )
      })}
    </Row>
  )
}
