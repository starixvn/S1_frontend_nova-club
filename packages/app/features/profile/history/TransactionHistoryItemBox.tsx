import { styled, View } from 'dripsy'
import React from 'react'

const TransactionHistoryItemBox = ({ children }) => {
  return (
    <View sx={{ position: 'relative', bg: '$primary.500', my: '$1', py: '$1' }}>
      <StyledContainer pointerEvents="none" />
      {children}
    </View>
  )
}

const StyledContainer = styled(View)(({}) => ({
  borderTopWidth: 1,
  borderBottomWidth: 1,
  position: 'absolute',
  borderColor: '$primary.50',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}))

export default TransactionHistoryItemBox
