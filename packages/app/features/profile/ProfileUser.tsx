import Avatar from 'app/components/Avatar'
import IconButton from 'app/components/form/IconButton'
import { styled, Text, View } from 'dripsy'
import React from 'react'

const ProfileUser = () => {
  return (
    <ViewWrapper>
      <Avatar
        source={require('../../assets/images/games/fishing/fishing08.png')}
        sx={{ mr: '$4', bg: 'white' }}
      />
      <ViewTextWrapper>
        <Text sx={{ color: '$PaleBlue', fontWeight: 'bold' }}>HELLO!</Text>
        <Text>PLAYER1648282114</Text>
      </ViewTextWrapper>
      <IconButton _icon={{ name: 'sb' }} />
      <IconButton _icon={{ name: 'lc' }} />
    </ViewWrapper>
  )
}

const ViewWrapper = styled(View)({
  p: '$8',
  flexDirection: 'row',
  alignItems: 'center',
})

const ViewTextWrapper = styled(View)({
  flex: 1,
})

export default ProfileUser
