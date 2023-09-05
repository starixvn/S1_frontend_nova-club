import { Text, View, useResponsiveValue } from 'dripsy'
import { MotiText } from 'moti'
import React from 'react'

const GameBottomRebateLabel = ({ rebateText, sportName }) => {
  const labelSize = useResponsiveValue([8, 8, 8, 10, 10])
  return (
    <View sx={{ flex: 1, flexDirection: 'row', p: 2 }}>
      <View sx={{ flex: 0.7, alignSelf: 'center' }}>
        <Text sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
          {sportName}
        </Text>
      </View>
      <View sx={{ flex: 0.3 }}>
        <MotiText
          style={{
            fontWeight: 'bold',
            fontSize: labelSize,
            color: '#FFEA61',
            textAlign: 'center',
          }}
          from={{
            scale: 1,
          }}
          animate={{
            scale: 1.1,
          }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 500,
          }}
        >
          {(rebateText === undefined ? '0' : rebateText) + ' %'}
        </MotiText>
        <Text
          sx={{ fontSize: 6, fontWeight: 'bold', textAlign: 'center' }}
          numberOfLines={1}
        >
          rebate
        </Text>
      </View>
    </View>
  )
}

export default GameBottomRebateLabel
