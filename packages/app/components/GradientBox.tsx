import { Gradient } from '@dripsy/gradient'
import { styled, View } from 'dripsy'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'

const GradientBox = ({ children, removeBorder, ...rest }) => {
  return (
    <Gradient gradient="darkNavyBlue" sx={{ position: 'relative' }} {...rest}>
      <StyledContainer
        removeBorder={removeBorder}
        sx={Platform.OS === 'web' ? { pointerEvents: 'none' } : {}}
      />
      {children}
    </Gradient>
  )
}

const StyledContainer = styled(View)(({ removeBorder = false }) => ({
  borderTopWidth: removeBorder ? 0 : 1,
  borderBottomWidth: removeBorder ? 0 : 1,
  position: 'absolute',
  borderColor: '$lightNavyBlue',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}))

export default GradientBox
