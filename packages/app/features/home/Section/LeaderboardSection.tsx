import { Image, styled, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const LeaderboardSection = () => {
  return (
    <View>
      <SectionHeader title={'TOP WINNER LIST'} bgColor="pink" iconName="sl" />
      <StyledImage source={require('../../../assets/leaderboard.png')} />
    </View>
  )
}

const StyledImage = styled(Image)({
  margin: 2,
  alignSelf: 'center',
  borderRadius: 5,
  height: [300, 350, 400],
  width: ['93%', '93%', '93%'],
})

export default LeaderboardSection
