import { ActivityIndicator, View } from 'dripsy'
import React from 'react'
import { Game } from 'services/gameApi.type'
import SectionHeader from '../SectionHeader'
import HorizontalGameList from './HorizontalGameList'
import { ViewProps } from 'react-native'

export interface GameListSectionProps extends ViewProps {
  data?: Game[]
  icon: string
  title: string
  seeMoreUrl?: string
}

export default function GameListSection({
  data,
  icon,
  title,
  seeMoreUrl,
  ...rest
}: GameListSectionProps) {
  return (
    <View {...rest}>
      <SectionHeader icon={icon} title={title} seeMoreUrl={seeMoreUrl} />
      <View
        sx={{
          height: [90, 120],
          justifyContent: 'center',
        }}
      >
        {data ? (
          <HorizontalGameList data={data} />
        ) : (
          <ActivityIndicator
            sx={{
              my: ['$2', '$3'],
            }}
            color="$primary.100"
          />
        )}
      </View>
    </View>
  )
}
