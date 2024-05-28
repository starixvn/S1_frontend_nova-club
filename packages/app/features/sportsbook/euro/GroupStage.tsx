import { MEDIA_DOMAIN } from '@env'
import { Row, Text, View, styled } from 'dripsy'
import React from 'react'
import { MatchResult } from 'services/matchApi.type'
import MatchFlag from './MatchFlag'

const GroupStage = () => {
  return (
    <View sx={{ p: '$2' }}>
      <GroupHeader />
      <View sx={{ gap: '$2' }}>
        {/* {data.map((item, index) => (
          <GroupRow key={index} index={index} item={item} />
        ))} */}
      </View>
    </View>
  )
}

const GroupHeader = () => {
  return (
    <Row sx={{ px: ['$1', '$4'] }}>
      <Text sx={{ px: '$2', flex: 1, fontWeight: 'bold' }}>Group A</Text>
      <ScoreText>MP</ScoreText>
      <ScoreText>W</ScoreText>
      <ScoreText>D</ScoreText>
      <ScoreText>L</ScoreText>
      <ScoreText>GF</ScoreText>
      <ScoreText>GA</ScoreText>
      <ScoreText>GD</ScoreText>
      <ScoreText sx={{ fontWeight: 'bold' }}>Pts</ScoreText>
    </Row>
  )
}

const GroupRow = ({ item, index }: { item: MatchResult; index: number }) => {
  const homeFlag = `${MEDIA_DOMAIN}/nvclub${item.HomeImagePath}`

  return (
    <Row
      sx={{
        bg: index % 2 ? 'transparent' : '$primaryEuro.500',
        borderWidth: 2,
        borderColor: '$primaryEuro.500',
        borderRadius: 12,
        alignItems: 'center',
        py: '$1',
        px: ['$1', '$4'],
      }}
    >
      <View sx={{ flex: 1 }}>
        <MatchFlag flag={homeFlag} label={item.HomeName} />
      </View>

      <ScoreText>0</ScoreText>
      <ScoreText>0</ScoreText>
      <ScoreText>0</ScoreText>
      <ScoreText>0</ScoreText>
      <ScoreText>0</ScoreText>
      <ScoreText>0</ScoreText>
      <ScoreText>0</ScoreText>
      <ScoreText sx={{ fontWeight: 'bold' }}>0</ScoreText>
    </Row>
  )
}

const ScoreText = styled(Text)({
  flexBasis: [32, 48],
  textAlign: 'center',
})

export default GroupStage
