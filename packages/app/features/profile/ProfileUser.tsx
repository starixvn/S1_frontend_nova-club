import Avatar from 'app/components/Avatar'
import IconButton from 'app/components/form/IconButton'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React from 'react'

type ProfileUserProps = {
  username: string
}

const ProfileUser = ({ username }: ProfileUserProps) => {
  const { t } = useLocalization()
  return (
    <ViewWrapper>
      <Avatar
        source={require('../../assets/images/games/fishing/fishing08.png')}
        sx={{ mr: '$2', bg: 'white' }}
      />
      <ViewTextWrapper>
        <Text
          numberOfLines={1}
          variant="sm"
          sx={{ color: '$PaleBlue', fontWeight: 'bold' }}
        >
          {t('common.hello')}
        </Text>
        <Text numberOfLines={1} variant="sm" sx={{ color: '#D6D5D5' }}>
          {username ?? ' '}
        </Text>
      </ViewTextWrapper>
      <IconButton name="sb" sx={{ mx: '$2' }} color={'$lightCyan'} />
      <IconButton name="lc" color={'$lightCyan'} />
    </ViewWrapper>
  )
}

const ViewWrapper = styled(View)({
  px: '$3',
  py: '$1',
  flexDirection: 'row',
  alignItems: 'center',
})

const ViewTextWrapper = styled(View)({
  flex: 1,
  mr: '$2',
})

export default ProfileUser
