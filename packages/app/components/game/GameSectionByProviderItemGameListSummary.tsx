import { Row } from 'dripsy'
import React from 'react'
import { Game } from 'services/gameApi.type'

import { useAppSelector } from 'app/provider/redux/store'
import GameCard from './GameCard'

const width = ['22%', '18%', '15%', '15%', '12%']
const spaces = ['1.5%', '1%', '0.83%', '0.83%', '1.14%']
const GameSectionByProviderItemGameListSummary = ({
  data,
  bordered = false,
}: {
  data: Game[]
  bordered?: boolean
}) => {
  const locale = useAppSelector((s) => s.setting.locale)
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        px: ['$3'],
        pt: ['$2'],
        pb: '$sectionBottomSpace',
        borderWidth: bordered ? 2 : 0,
        borderColor: '$primary.300',
      }}
    >
      {data.map((g, i) => {
        return (
          <GameCard
            key={i}
            width={width}
            sx={{
              m: spaces,
            }}
            {...g}
          />
        )
      })}
    </Row>
  )
}

export default GameSectionByProviderItemGameListSummary
