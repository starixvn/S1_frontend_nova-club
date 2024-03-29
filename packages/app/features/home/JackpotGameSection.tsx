import GameListSection from 'app/components/game/GameListSection'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'
import { useGetGameListByTagsQuery } from 'services/gameApi'
import { SlotType } from 'utils/constant'

export default function JackpotGameSection() {
  const { t } = useLocalization()
  const currency = useAppSelector((s) => s.setting.currency)

  const { data = [] } = useGetGameListByTagsQuery({
    tags: [SlotType.MEGAWAY],
    currency,
  })

  return (
    <GameListSection
      data={data}
      icon="sl"
      title={t('game.jackpot').toUpperCase()}
    />
  )
}
