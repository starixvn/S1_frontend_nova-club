import React from 'react'
import { View, Text } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import { useAppSelector } from 'app/provider/redux/store'
import { usePlayerProfileQuery } from 'services/playerApi'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'

type ProfileItemProps = {
  label: string
  value: string
}

const ProfileItem = ({ label, value }: ProfileItemProps) => {
  return (
    <View
      sx={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '$primary.100',
        marginVertical: '$2',
        bg: '$primary.500',
      }}
    >
      <View
        sx={{
          width: '85%',
          flexDirection: 'row',
          mx: '$5',
          py: 20,
        }}
      >
        <Text sx={{ minWidth: 150 }}>{label}:</Text>

        <Text>{value}</Text>
      </View>
    </View>
  )
}

const ProfileDetails = () => {
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { t } = useLocalization()
  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !token,
  })
  return (
    <PageWithBackHeader header={{ title: 'common.profile' }} disableScrollView>
      <View sx={{ mt: '$2' }}>
        <ProfileItem
          label={t('common.realName')}
          value={`${playerData?.firstName || ''} ${playerData?.lastName || ''}`}
        />
        <ProfileItem
          label={t('common.username')}
          value={playerData?.username || ''}
        />
        <ProfileItem
          label={t('common.phone')}
          value={'+' + playerData?.contractNumber || ''}
        />
        <ProfileItem
          label={t('common.playerId')}
          value={'+' + playerData?.player_id || ''}
        />
        <ProfileItem
          label={t('common.currency')}
          value={'+' + playerData?.currency || ''}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default ProfileDetails
