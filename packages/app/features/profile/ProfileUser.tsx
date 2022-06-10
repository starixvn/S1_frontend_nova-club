import Avatar from 'app/components/Avatar'
import IconButton from 'app/components/form/IconButton'
import { styled, Text, View } from 'dripsy'
import React from 'react'

type ProfileUserProps = {
  username: string
}

const ProfileUser = ({ username }: ProfileUserProps) => {
  return (
    <ViewWrapper>
      <Avatar
        source={require('../../assets/images/games/fishing/fishing08.png')}
        sx={{ mr: '$2', bg: 'white' }}
      />
      <ViewTextWrapper>
        <Text sx={{ color: '$PaleBlue', fontWeight: 'bold' }}>HELLO!</Text>
        <Text>{username}</Text>
      </ViewTextWrapper>
      <IconButton name="sb" />
      <IconButton name="lc" />
    </ViewWrapper>
  )
}

const ViewWrapper = styled(View)({
  p: '$4',
  flexDirection: 'row',
  alignItems: 'center',
})

const ViewTextWrapper = styled(View)({
  flex: 1,
})

export default ProfileUser
