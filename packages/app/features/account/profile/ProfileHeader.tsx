import Icon from 'app/components/Icon'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View, Text, Image } from 'dripsy'
import React from 'react'
import { ProfileResult } from '../../../../services/playerApi.type'
import IconButton from 'app/components/IconButton'
import useLocalization from 'app/provider/localization'
import { useRouter } from 'solito/router'

const HEADER_HEIGHT = 80
const AVATAR_SIZE = 30

interface ProfileHeaderProps {
  data?: ProfileResult
}

export default function ProfileHeader({ data }: ProfileHeaderProps) {
  const { top, bottom } = useSafeArea()
  const { back } = useRouter()
  const { t } = useLocalization()
  return (
    <View
      sx={{
        height: HEADER_HEIGHT + top,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        px: 25,
        pt: top + 15,
        bg: '$primary.500',
        pb: 15,
      }}
    >
      <View sx={{ alignItems: 'center', flexDirection: 'row' }}>
        <IconButton
          name={'back'}
          onPress={() => {
            back()
          }}
        />
        <Image
          sx={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: 100,
            borderWidth: 2,
            mx: 15,
            borderColor: 'white',
          }}
          source={require('../../../assets/images/common/en.jpg')}
          resizeMode="contain"
          alt=""
        />
        <View>
          <Text sx={{ fontSize: 12, fontWeight: 'bold' }}>
            {data?.username}
          </Text>
          <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text sx={{ fontSize: 12 }}>{data?.referral_code}</Text>
            <IconButton name={'copy'} size={16} sx={{ pl: 10 }} />
          </View>
          <Text sx={{ fontSize: 12 }}>{t('profile.timeline')}</Text>
        </View>
      </View>

      <Icon name={'qr'} size={30} />
    </View>
  )
}
