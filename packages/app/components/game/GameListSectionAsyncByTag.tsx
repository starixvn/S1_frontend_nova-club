import React, { memo, useEffect, useState } from 'react'
import { useGetGameListByTagsQuery } from 'services/gameApi'
import GameListSection, { GameListSectionProps } from './GameListSection'
import { SlotType } from 'utils/constant'

interface GameListSectionAsyncByTagProps
  extends Omit<GameListSectionProps, 'data'> {
  nativeID?: string
  tag: SlotType
  delay?: number
  seeMoreUrl?: string
}

const GameListSectionAsyncByTag = ({
  tag,
  delay,
  seeMoreUrl,
  nativeID,
  ...rest
}: GameListSectionAsyncByTagProps) => {
  const [isDelayed, setDelayed] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setDelayed(true)
    }, delay ?? 10)
  }, [])

  const { data } = useGetGameListByTagsQuery(
    { tags: [tag] },
    {
      refetchOnMountOrArgChange: true,
      skip: !isDelayed,
    }
  )

  return (
    <GameListSection
      nativeID={nativeID}
      data={data}
      seeMoreUrl={seeMoreUrl}
      {...rest}
    />
  )
}

export default memo(GameListSectionAsyncByTag)
