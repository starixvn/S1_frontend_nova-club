import React, { memo, useEffect, useState } from 'react'
import { useGetGameListByTagsQuery } from 'services/gameApi'
import GameListSection, { GameListSectionProps } from './GameListSection'
import { SlotType } from 'app/utils/constant'

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
  useEffect(() => {
    setTimeout(() => {
      setDelayed(true)
    }, delay ?? 10)
  }, [])

  const { data } = useGetGameListByTagsQuery([tag], {
    refetchOnMountOrArgChange: true,
    skip: !isDelayed,
  })

  return <GameListSection data={data} seeMoreUrl={seeMoreUrl} {...rest} />
}

export default memo(GameListSectionAsyncByTag)
