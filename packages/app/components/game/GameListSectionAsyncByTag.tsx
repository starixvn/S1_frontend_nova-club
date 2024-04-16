import React, { memo, useEffect, useState } from 'react'
import { useGetGameListByTagsQuery } from 'services/gameApi'
import GameListSection, { GameListSectionProps } from './GameListSection'
import { SlotType } from 'utils/constant'
import { useAppSelector } from 'app/provider/redux/store'

import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
interface GameListSectionAsyncByTagProps
  extends Omit<GameListSectionProps, 'data'> {
  tag: SlotType
  delay?: number
  seeMoreUrl?: string
}

const GameListSectionAsyncByTag = ({
  tag,
  delay,
  seeMoreUrl,
  ...rest
}: GameListSectionAsyncByTagProps) => {
  const [isDelayed, setDelayed] = useState(false)
  const currency = useAppSelector((s) => s.setting.currency)

  useEffect(() => {
    setTimeout(() => {
      setDelayed(true)
    }, delay ?? Math.random() * 1000)
  }, [])

  const { data } = useGetGameListByTagsQuery(
    { tags: [tag], currency },
    {
      skip: !isDelayed,
    }
  )

  return <GameListSection data={data} seeMoreUrl={seeMoreUrl} {...rest} />
}

export default memo(GameListSectionAsyncByTag)
