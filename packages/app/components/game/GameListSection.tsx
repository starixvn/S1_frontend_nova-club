import { ScrollView, View } from 'dripsy'
import React from 'react'
import SectionHeader from '../SectionHeader'
import GameCard from './GameCard'
import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import HorizontalGameList from './HorizontalGameList'

export default function GameListSection({ data, icon, title }) {
  return (
    <View sx={{ mb: '$sectionBottomSpace' }}>
      <SectionHeader icon={icon} title={title} />
      <HorizontalGameList data={data} sx={{ mt: ['$2', '$3'] }} />
    </View>
  )
}
