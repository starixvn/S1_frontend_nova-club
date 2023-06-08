import { ScrollView, useResponsiveValue } from 'dripsy'
import React from 'react'
import GameCard from './GameCard'
import { Skeleton } from 'moti/skeleton'
import { Game } from 'services/gameApi.type'
import { ScrollViewProps } from 'react-native'
import SkeletonPlaceholder from '../SkeletonPlaceholder'

interface HorizontalGameListProps extends ScrollViewProps {
  data: Game[] | number[]
  size: number[]
}

export default function HorizontalGameList({
  data = Array(10).fill(0),
  size = [80, 100],
  ...rest
}: HorizontalGameListProps) {
  const shadowSize = useResponsiveValue(size)
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerSx={{ gap: ['$2', '$3'], px: ['$2', '$3'] }}
      {...rest}
    >
      {data ? (
        data.map((g, i) => {
          return (
            <GameCard
              width={size}
              height={size}
              key={g.gc}
              // name={g.name['en']}
              image={g.img}
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
    </ScrollView>
  )
}
