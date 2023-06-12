import SectionHeader from 'app/components/SectionHeader'
import React from 'react'
import LeaderboardTable from '../leaderboard/components/LeaderboardTable'
import { View } from 'dripsy'

const LeaderboardSection = () => {
  return (
    <>
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
        <LeaderboardTable isHome />
      </View>
    </>
  )
}

export default LeaderboardSection
