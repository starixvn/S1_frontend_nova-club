import GameListSection from 'app/components/game/GameListSection'
import useLocalization from 'app/provider/localization'
import React from 'react'
import { useGetGameListByTagsQuery } from 'services/gameApi'
import { SlotType } from 'utils/constant'

export default function JackpotGameSection() {
  const { t } = useLocalization()
  const { data = [] } = useGetGameListByTagsQuery({ tags: [SlotType.MEGAWAY] })

  return (
    <GameListSection
      data={data}
      icon="sl"
      title={t('game.jackpot').toUpperCase()}
    />
  )
}
