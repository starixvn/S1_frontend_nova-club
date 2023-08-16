import GameListSection from 'app/components/game/GameListSection'
import useLocalization from 'app/provider/localization'
import { SlotType } from 'app/utils/constant'
import React from 'react'
import {
  useGetGameListByTagsQuery
} from 'services/gameApi'

export default function JackpotGameSection() {
  const { t } = useLocalization()
  const { data = [] } = useGetGameListByTagsQuery([SlotType.MEGAWAY])

  return (
    <GameListSection
      data={data}
      icon="sl"
      title={t('game.jackpot').toUpperCase()}
    />
  )
}
