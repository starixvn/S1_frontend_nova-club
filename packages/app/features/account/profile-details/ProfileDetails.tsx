import IconButton from 'app/components/IconButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { copyToClipboard } from 'app/utils'
import isDesktop from 'app/utils/isDesktop'
import { Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'

type ProfileItemProps = {
  label: string
  value: string
  copy?: boolean
}

const ProfileItem = ({ label, value, copy = false }: ProfileItemProps) => {
  const isMobile = !isDesktop()
  return (
    <View
      sx={{
        marginVertical: '$2',
        ...(isMobile && {
          bg: '$primary.500',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '$primary.100',
        }),
      }}
    >
      <View
        sx={{
          flexDirection: 'row',
          mx: '$5',
          py: 20,
          alignItems: 'center',

          ...(isDesktop() && {
            justifyContent: 'center',
          }),
        }}
      >
        <Text sx={{ minWidth: 150 }}>{label}:</Text>

        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...(isDesktop()
              ? {
                  minWidth: 400,
                  borderColor: '$primary.100',
                  borderWidth: 1,
                  px: '$4',
                  py: '$2',
                  borderRadius: 5,
                }
              : {}),
          }}
        >
          <Text>{value}</Text>
          {copy && (
            <IconButton
              sx={{ ml: '$2' }}
              size={16}
              name="copy"
              onPress={() => copyToClipboard(value)}
            />
          )}
        </View>
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
  const desktop = isDesktop()
  return (
    <PageWithBackHeader
      header={{ title: t('common.profile') }}
      disableScrollView
      hideHeader={desktop}
    >
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
          value={playerData?.player_id || ''}
          copy={true}
        />
        <ProfileItem
          label={t('common.currency')}
          value={playerData?.currency || ''}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default ProfileDetails
