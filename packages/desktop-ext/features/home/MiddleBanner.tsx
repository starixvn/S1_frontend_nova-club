import { View } from 'dripsy'
import React from 'react'

export default function MiddleBanner(props) {
  return (
    <View {...props}>
      <View sx={{ flex: 1, bg: '$secondary.500' }} />
      <View sx={{ flex: 1, bg: '$secondary.500' }} />
    </View>
  )
}
