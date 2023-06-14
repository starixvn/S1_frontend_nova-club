import { ScrollView, useResponsiveValue } from 'dripsy'
import React, { useCallback } from 'react'
import GameCard from './GameCard'
import { Skeleton } from 'moti/skeleton'
import { Game } from 'services/gameApi.type'
import { ScrollViewProps } from 'react-native'
import SkeletonPlaceholder from '../SkeletonPlaceholder'
import { LaunchGame } from 'app/features/game/GameLauncher'
import i18n from 'app/provider/localization/i18n'
import { useAppSelector } from 'app/provider/redux/store'
import { GameToLaunchPayload } from 'app/utils/game'

interface HorizontalGameListProps extends ScrollViewProps {
  data: Game[]
  size: number[]
}

export default function HorizontalGameList({
  data,
  size = [80, 100],
  ...rest
}: HorizontalGameListProps) {
  const shadowSize = useResponsiveValue(size)
  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerSx={{ gap: ['$2', '$3'], px: ['$2', '$3'] }}
      {...rest}
    >
      {data ? (
        data.map((g: Game) => {
          const gamePayload = GameToLaunchPayload(g, locale)
          return (
            <GameCard width={size} height={size} key={g.gc} {...gamePayload} />
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
