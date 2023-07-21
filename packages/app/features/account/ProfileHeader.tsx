import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { HEADER_HEIGHT } from 'app/utils/constant'
import { Pressable, View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { ProfileResult } from 'services/playerApi.type'
import { useRouter } from 'solito/router'
import ProfileHeaderCard from './ProfileHeaderCard'
import { Platform } from 'react-native'

interface ProfileHeaderProps {
  data?: ProfileResult
  height: number
}

export default function ProfileHeader({ data, height }: ProfileHeaderProps) {
  const { top } = useSafeArea()
  const { back } = useRouter()
  const { openModal } = useModal()

  return (
    <View
      sx={{
        height,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        px: 25,
        pt: top + 15,
        bg: '$primary.500',
        pb: 15,
        zIndex: 1,
        position: Platform.OS === 'web' ? 'fixed' : 'relative',
      }}
    >
      <View sx={{ alignItems: 'center', flexDirection: 'row' }}>
        <IconButton
          name={'back'}
          onPress={() => {
            back()
          }}
        />
        <ProfileHeaderCard data={data} />
      </View>
      <Pressable onPress={() => openModal('ReferralModal')}>
        <Icon name={'qr'} size={30} />
      </Pressable>
    </View>
  )
}
