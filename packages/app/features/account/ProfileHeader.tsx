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

interface ProfileHeaderProps {
  data?: ProfileResult
}

export default function ProfileHeader({ data }: ProfileHeaderProps) {
  const { top } = useSafeArea()
  const { back } = useRouter()
  const { openModal } = useModal()

  return (
    <View
      sx={{
        height: HEADER_HEIGHT + (top ? top : 30),
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
        <ProfileHeaderCard data={data} />
      </View>
      <Pressable onPress={() => openModal('ReferralModal')}>
        <Icon name={'qr'} size={30} />
      </Pressable>
    </View>
  )
}
