import React from 'react'
import { View, styled } from 'dripsy'

const LeftPanelContainer = styled(View)({
  flexBasis: 200,
  maxWidth: 320,
  flexGrow: 1,
  borderWidth: 1,
  mr: 20,
  mb: 20,
  borderStyle: 'dashed',
  borderColor: '$primary.300',
  alignSelf: 'flex-start',
})

export default LeftPanelContainer
