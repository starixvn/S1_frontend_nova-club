import { View } from 'dripsy'
import React from 'react'
import { StyleSheet } from 'react-native'

const Divider = ({
  orientation = 'horizontal',
}: {
  orientation?: 'horizontal' | 'vertical'
}) => {
  return (
    <View
      sx={{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '$lightNavyBlue',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        // width: orientation === 'horizontal' ? '100%' : 0,
        // height: orientation === 'vertical' ? '80%' : 0,
      }}
    />
  )
}

export default Divider
