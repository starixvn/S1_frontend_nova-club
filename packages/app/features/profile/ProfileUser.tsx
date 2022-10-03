import Avatar from 'app/components/Avatar'
import IconButton from 'app/components/form/IconButton'
import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'
const ProfileUser = () => {
  const { t } = useLocalization()
  const { push, back } = useRouter()
  const { openModal } = useModal()
  const { data } = usePlayerProfileQuery()
  const username = data?.username
  const referralCode = data?.referral_code

  const { makeContextualHref } = useContextualRouting()
  const toQrcodeScanner = makeContextualHref('qrcode-scanner')

  const handleCopy = () => {
    copyToClipboard(referralCode)
  }

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
        {/* <Text variant="sm" sx={{ color: '$PaleBlue', fontWeight: 'bold' }}>
          {t('common.hello')}
        </Text> */}
        <Text numberOfLines={1} variant="sm" sx={{ color: '#D6D5D5' }}>
          {username ?? ' '}
        </Text>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            selectable
            numberOfLines={1}
            variant="sm"
            sx={{ fontSize: 12, color: 'grey' }}
          >
            {referralCode ?? ' '}
          </Text>
          <IconButton
            name="copy"
            color={'$lightCyan'}
            size={16}
            onPress={handleCopy}
            sx={{ ml: '$2' }}
          />
        </View>
      </ViewTextWrapper>
      <IconButton
        name="bar-code"
        color={'$lightCyan'}
        onPress={() => openModal('ReferralModal')}
      />
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
  justifyContent: 'center',
  mr: '$2',
})

export default ProfileUser
