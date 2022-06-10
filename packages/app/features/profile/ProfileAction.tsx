import IconAction from 'app/components/IconAction'
import { styled, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

const ProfileAction = () => {
  const { push } = useRouter()

  const handleOnPress = () => {
    console.log('Profile action click')
  }

  return (
    <StyledView>
      <IconAction
        gradient="lightRed"
        icon="sb"
        title="Deposit"
        size={'md'}
        onPress={handleOnPress}
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightGreen"
        icon="games"
        title="Withdraw"
        size={'md'}
        onPress={() => push('/withdrawal')}
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightBlue"
        icon="sl"
        title="Bank Account"
        size={'md'}
        onPress={() => push('/profile/bank-account')}
        sx={{ flex: 1 }}
      />
      <IconAction
        gradient="lightYellow"
        icon="lc"
        title="History"
        size={'md'}
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
