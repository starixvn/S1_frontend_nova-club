import IconAction from 'app/components/IconAction'
import { styled, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

const ProfileAction = () => {
  const { push } = useRouter()

  const handleOnPress = () => {
    push('profile/bank-account')
  }

  return (
    <StyledView>
      <IconAction
        gradient="lightRed"
        icon="sb"
        title="Deposit"
        onPress={handleOnPress}
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightGreen"
        icon="games"
        title="Withdraw"
        onPress={handleOnPress}
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightBlue"
        icon="sl"
        title="Bank Account"
        onPress={handleOnPress}
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightYellow"
        icon="lc"
        title="History"
        onPress={handleOnPress}
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
