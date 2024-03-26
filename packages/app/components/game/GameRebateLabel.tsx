import { View, useResponsiveValue } from 'dripsy'
import { MotiText } from 'moti'
import React from 'react'

const GameRebateLabel = ({ rebateText, background = 'rgba(0,0,0,1)' }) => {
  const labelSize = useResponsiveValue([10, 12, 12, 14, 14])
  return (
    <View
      sx={{
        bg: background,
        px: '$3',
        py: '$1',
        borderRadius: 15,
        minWidth: 30,
      }}
    >
      <MotiText
        style={{
          fontWeight: 'bold',
          fontSize: labelSize,
          color: '#FFAD1A',
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
    </View>
  )
}

export default GameRebateLabel
