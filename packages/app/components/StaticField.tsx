import { View, styled } from 'dripsy'
import React from 'react'

const StaticField = ({ children, ...rest }) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>
}

const StyledContainer = styled(View)({
  bg: '$primary.500',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '$primary.100',
})

export default StaticField
