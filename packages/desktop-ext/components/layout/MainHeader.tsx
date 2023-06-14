import React from 'react'
import { View } from 'dripsy'
import { DripsyGradient } from 'app/components/Gradient'

export const HEADER_HEIGHT = 160
export default function MainHeader({}) {
  return (
    <View sx={{ height: HEADER_HEIGHT, bg: '$primary.500' }}>
      <DripsyGradient
        gradient="surface"
        sx={{ height: 80, marginTop: 'auto' }}
      >
          
      </DripsyGradient>
    </View>
  )
}
