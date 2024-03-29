import { useResponsiveValue } from 'dripsy'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { ScrollViewProps } from 'react-native'
import { Game } from 'services/gameApi.type'
import DraggableScrollView from '../DraggableScrollView'
import SkeletonPlaceholder from '../SkeletonPlaceholder'
import GameCard from './GameCard'
import { GAME_TYPE_CODE } from 'utils/constant'
import { GAME_TAG_SIZE } from './GameTagsLabel'
import { useAppSelector } from 'app/provider/redux/store'

interface HorizontalGameListProps extends ScrollViewProps {
  data: Game[]
  size?: number[]
  tagSize?: GAME_TAG_SIZE
}

export default function HorizontalGameList({
  data,
  size = [80, 100],
  tagSize = GAME_TAG_SIZE.sm,
  ...rest
}: HorizontalGameListProps) {
  const shadowSize = useResponsiveValue(size)
  const locale = useAppSelector((s) => s.setting.locale)

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
              width={size}
              height={size}
              key={g.gtc === GAME_TYPE_CODE.LIVE_DEALER ? g.gpc : g.gc}
              isFullCard
              {...g}
              img={g.img[locale]}
              xImg={g.xImg?.[locale]}
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
