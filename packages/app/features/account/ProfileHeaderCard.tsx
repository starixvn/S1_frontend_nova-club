import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import isDesktop from 'app/utils/isDesktop'
import { Image, Pressable, Text, View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { ProfileResult } from 'services/playerApi.type'
import { DEV_DOMAIN } from '../../../../apps/next/config/env'

interface ProfileHeaderCardProps {
  data?: ProfileResult
}

const ProfileHeaderCard = ({ data }: ProfileHeaderCardProps) => {
  const { t } = useLocalization()
  const { openModal } = useModal()
  const desktop = isDesktop()
  const AVATAR_SIZE = desktop ? 45 : 30
  const fontSize = desktop ? 15 : 14
  const referralLink = `${DEV_DOMAIN}/download?ref=${data?.referral_code}`

  return (
    <View
      sx={{
        justifyContent: 'center',
        ...(desktop
          ? {
              bg: '$primary.500',
              px: '$2',
              borderRadius: 15,
              height: 125,
            }
          : {}),
      }}
    >
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: desktop ? '$2' : 0,
        }}
      >
        <Image
          sx={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: 100,
            borderWidth: 2,
            mx: desktop ? 0 : 15,
            borderColor: 'white',
          }}
          source={require('../../assets/images/common/en.jpg')}
          resizeMode="contain"
          alt=""
        />

        <View sx={{ ...(desktop ? { mx: '$3' } : {}) }}>
          <Text sx={{ fontSize, fontWeight: 'bold' }}>{data?.username}</Text>
          <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text sx={{ fontSize }}>{data?.referral_code}</Text>
            <IconButton
              name={'copy'}
              size={desktop ? 22 : 16}
              sx={{ pl: 10 }}
              onPress={() => copyToClipboard(referralLink)}
            />
          </View>
          {!desktop && <Text sx={{ fontSize }}>{t('common.timeline')}</Text>}
        </View>
        {desktop && (
          <Pressable onPress={() => openModal('ReferralModal')}>
            <Icon name={'qr'} size={desktop ? 40 : 30} />
          </Pressable>
        )}
      </View>
      {desktop && (
        <View sx={{ height: 20, mt: '$2' }}>
          <Text sx={{ fontSize }}>{t('common.timeline')}</Text>
        </View>
      )}
    </View>
  )
}

export default ProfileHeaderCard
