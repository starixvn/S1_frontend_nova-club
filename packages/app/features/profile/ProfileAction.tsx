import IconAction from 'app/components/IconAction'
import { styled, View } from 'dripsy'
import React from 'react'

const ProfileAction = () => {
  return (
    <StyledView>
      <IconAction
        gradient="lightRed"
        icon="sb"
        title="Deposit"
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightGreen"
        icon="games"
        title="Withdraw"
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightBlue"
        icon="sl"
        title="Bank Account"
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightYellow"
        icon="lc"
        title="History"
        sx={{ flex: 1 }}
      />
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  flexDirection: 'row',
  m: '$8',
  textAlign: 'center',
}))

export default ProfileAction
