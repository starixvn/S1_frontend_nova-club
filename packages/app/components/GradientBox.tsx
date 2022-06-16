import { Gradient } from '@dripsy/gradient'
import { styled, View } from 'dripsy'
import React from 'react'

const GradientBox = ({ children, ...rest }) => {
  return (
    <GradientWrap>
      <Gradient gradient="darkNavyBlue" {...rest}>
        {children}
      </Gradient>
    </GradientWrap>
  )
}

const GradientWrap = styled(View)(() => ({
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '$lightNavyBlue',
}))

export default GradientBox
