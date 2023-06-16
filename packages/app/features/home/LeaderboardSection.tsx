import SectionHeader from 'app/components/SectionHeader'
import React from 'react'
import LeaderboardTable from '../leaderboard/components/LeaderboardTable'
import { View, useResponsiveValue } from 'dripsy'

const LeaderboardSection = (props) => {
  const displayRowCount = useResponsiveValue([5, 5, 5, 10])
  return (
    <View {...props}>
      <SectionHeader icon="crown" title="menu.leaderboard" />
      <View
        sx={{
          m: '$pagePadding',
          overflow: 'hidden',
          borderRadius: 24,
          borderWidth: 1,
          borderColor: '$primary.100',
        }}
      >
        <LeaderboardTable maxRow={displayRowCount} />
      </View>
    </View>
  )
}

export default LeaderboardSection
