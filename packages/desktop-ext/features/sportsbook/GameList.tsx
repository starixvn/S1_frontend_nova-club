import GameCard from 'app/components/game/GameCard'
import {
  GetCommissionList,
  GetGameRebateValue,
} from 'app/components/game/GameUtilityAction'
import { GAME_TYPE_CODE } from 'utils/constant'
import { Row, useResponsiveValue } from 'dripsy'
import React, { useMemo } from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import uniqBy from 'lodash/uniqBy'

export default function GameList({}) {
  const commissionList = GetCommissionList()
  const { data } = useGetGameListByCategoryQuery([
    GAME_TYPE_CODE.SPORTS,
    GAME_TYPE_CODE.E_SPORTS,
    GAME_TYPE_CODE.VIRTUAL_SPORTS,
  ])
  const isHFive = useResponsiveValue([true, true, true, false])

  const providers = useMemo(() => {
    if (data) return uniqBy(data, (d) => [d.gpc, d.gtc].join())
    else return []
  }, [data])

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
      {providers?.map((g) => {
        return (
          <GameCard
            showRebate={true}
            rebateTop
            rebateText={GetGameRebateValue({
              gtc: g.gtc,
              gpc: g.gpc,
              commissionList,
            })}
            absoluteName
            // displayName={g.name[locale]}
            key={g.gc + g.gpc}
            sx={{ width: '11%' }}
            isDualVersion={isHFive}
            {...g}
          />
        )
      })}
    </Row>
  )
}
