import React from 'react'
import { View, styled } from 'dripsy'

const LeftPanelContainer = styled(View)({
  flexBasis: 200,
  maxWidth: 320,
  flexGrow: 1,
  mr: '$layoutSpace',
  mb: '$layoutSpace',
  // borderStyle: 'dashed',
  // borderWidth: 1,
  // borderColor: '$primary.300',
  alignSelf: 'flex-start',
})

export default LeftPanelContainer
