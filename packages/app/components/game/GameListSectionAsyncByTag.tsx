import React, { memo } from 'react'
import { useGetGameListByTagsQuery } from 'services/gameApi'
import GameListSection, { GameListSectionProps } from './GameListSection'
import { SlotType } from 'app/utils/constant'

interface GameListSectionAsyncByTagProps
  extends Omit<GameListSectionProps, 'data'> {
  tag: SlotType
}

const GameListSectionAsyncByTag = ({
  tag,
  ...rest
}: GameListSectionAsyncByTagProps) => {
  const { data } = useGetGameListByTagsQuery([tag], {
    refetchOnMountOrArgChange: true,
  })

  return <GameListSection data={data} {...rest} />
}

export default memo(GameListSectionAsyncByTag)
