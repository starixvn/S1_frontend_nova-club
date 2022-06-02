import { Gradient } from '@dripsy/gradient'
import { styled } from 'dripsy'
import React from 'react'

const GradientBox = ({ children, ...rest }) => {
  return (
    <StyledGradient gradient="darkNavyBlue" {...rest}>
      {children}
    </StyledGradient>
  )
}

const StyledGradient = styled(Gradient)(() => ({
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '$lightNavyBlue',
}))

export default GradientBox
