import Avatar from 'app/components/Avatar'
import { Button } from 'app/components/form/Button'
import IconButton from 'app/components/form/IconButton'
import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'

type ProfileUserProps = {
  username: string
}

const ProfileUser = ({ username }: ProfileUserProps) => {
  const { t } = useLocalization()
  const { push, back } = useRouter()
  const { openModal } = useModal()

  const { makeContextualHref } = useContextualRouting()
  const toQrcodeScanner = makeContextualHref('qrcode-scanner')

  return (
    <ViewWrapper>
      <BouncePressable onPress={() => back()} sx={{ mr: '$4', p: '$2' }}>
        <Icon name="chevleft" size={20} color="#9CD9FA" />
      </BouncePressable>
      <Avatar
        source={require('../../assets/images/register/referral-avatar.png')}
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
      <Button
        variant="md"
        fill={{
          type: 'gradient',
          color: 'secondary',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        onPress={() => openModal('ReferralModal')}
      >
        <Button.Label>{t('menu.referral')}</Button.Label>
      </Button>
    </ViewWrapper>
  )
}

const ViewWrapper = styled(View)({
  px: '$3',
  py: '$3',
  flexDirection: 'row',
  alignItems: 'center',
})

const ViewTextWrapper = styled(View)({
  flex: 1,
  mr: '$2',
})

export default ProfileUser
