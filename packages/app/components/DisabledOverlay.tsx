import { View } from 'dripsy'
import React from 'react'

const DisabledOverlay = ({ contentStyle }) => (
  <View
    sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      bg: 'black',
      opacity: 0.7,
      ...contentStyle,
    }}
  />
)

export default DisabledOverlay
