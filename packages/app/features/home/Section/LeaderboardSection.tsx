import { Image, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const LeaderboardSection = () => {
  return (
    <View>
      <SectionHeader title={'TOP WINNER LIST'} bgColor="pink" />
      <Image
        source={require('../../../assets/leaderboard.png')}
        sx={{
          margin: 2,
          alignSelf: 'center',
          borderRadius: 5,
          height: [300, 350, 400],
          width: ['93%', '93%', '93%'],
        }}
      />
    </View>
  )
}

export default LeaderboardSection
