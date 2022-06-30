import { Gradient } from '@dripsy/gradient'
import { styled, View } from 'dripsy'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'

const GradientBox = ({ children, ...rest }) => {
  return (
    <Gradient gradient="darkNavyBlue" sx={{ position: 'relative' }} {...rest}>
      <StyledContainer
        sx={{ pointerEvents: Platform.OS === 'web' ? 'none' : '' }}
      ></StyledContainer>
      {children}
    </Gradient>
  )
}

const StyledContainer = styled(View)(() => ({
  borderTopWidth: 1,
  borderBottomWidth: 1,
  position: 'absolute',
  borderColor: '$lightNavyBlue',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}))

export default GradientBox
