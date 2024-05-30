import { useAppSelector } from 'app/provider/redux/store'
import { useResponsiveValue } from 'dripsy'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { ScrollViewProps } from 'react-native'
import { Game } from 'services/gameApi.type'
import { GAME_TYPE_CODE } from 'utils/constant'
import DraggableScrollView from '../DraggableScrollView'
import SkeletonPlaceholder from '../SkeletonPlaceholder'
import GameCard from './GameCard'
import { GAME_TAG_SIZE } from './GameTagsLabel'

interface HorizontalGameListProps extends ScrollViewProps {
  data: Game[]
  size?: number[]
  tagSize?: GAME_TAG_SIZE
}

const DEFAULT_GAMESIZE = [80, 100]

export default function HorizontalGameList({
  data,
  size,
  tagSize = GAME_TAG_SIZE.sm,
  ...rest
}: HorizontalGameListProps) {
  const _localSize = size ?? DEFAULT_GAMESIZE
  const shadowSize = useResponsiveValue(_localSize)

  return (
    <DraggableScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerSx={{
        gap: ['$2', '$3'],
        px: ['$2', '$3'],
        pt: ['$2', '$3'], // Beware on parent height at GameListSection
      }}
      {...rest}
    >
      {data ? (
        data.map((g: Game) => {
          return (
            <GameCard
              // name={g.name[locale]}
              gameTagSize={tagSize}
              width={_localSize}
              height={_localSize}
              key={g.gtc === GAME_TYPE_CODE.LIVE_DEALER ? g.gpc : g.gc}
              isFullCard
              {...g}
              img={g.img}
              xImg={g.xImg}
            />
          )
        })
      ) : (
        <Skeleton.Group show={true}>
          {Array(10)
            .fill(0)
            .map((r, index) => (
              <SkeletonPlaceholder
                key={index}
                height={shadowSize}
                width={shadowSize}
              />
            ))}
        </Skeleton.Group>
      )}
    </DraggableScrollView>
  )
}
