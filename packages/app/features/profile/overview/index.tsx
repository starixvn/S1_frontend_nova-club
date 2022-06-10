import { styled, View } from 'dripsy'
import React from 'react'
import OverviewCard from './OverviewCard'

const OverviewScreen = () => {
  return (
    <StyledView>
      <OverviewCard title={'Self'} />
      <View sx={{ mt: 36 }} />
      <OverviewCard title={'Circle'} isDirect />
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  p: '$8',
}))

export default OverviewScreen
