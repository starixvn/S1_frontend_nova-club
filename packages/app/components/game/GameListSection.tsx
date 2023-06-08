import { ActivityIndicator, View } from 'dripsy'
import React from 'react'
import { Game } from 'services/gameApi.type'
import SectionHeader from '../SectionHeader'
import HorizontalGameList from './HorizontalGameList'

export interface GameListSectionProps {
  data?: Game[]
  icon: string
  title: string
}

export default function GameListSection({
  data,
  icon,
  title,
}: GameListSectionProps) {
  return (
    <View sx={{ mb: '$sectionBottomSpace' }}>
      <SectionHeader icon={icon} title={title} />
      {data ? (
        <HorizontalGameList data={data} sx={{ mt: ['$2', '$3'] }} />
      ) : (
        <ActivityIndicator
          sx={{ my: ['$2', '$3'], alignSelf: 'flex-start', ml: '$pagePadding' }}
          color="$tertiary"
        />
      )}
    </View>
  )
}
