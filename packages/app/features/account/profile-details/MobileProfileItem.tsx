import { View, Text, ActivityIndicator } from 'dripsy'
import React from 'react'
import isDesktop from 'app/utils/isDesktop'
import IconButton from 'app/components/IconButton'
import { copyToClipboard } from 'app/utils'
import useLocalization from 'app/provider/localization'
import { ProfileResult } from 'services/playerApi.type'

type ProfileItemProps = {
  label: string
  value: string
  copy?: boolean
}
interface MobileProfileDetailsProps {
  playerData?: ProfileResult
}

const MobileProfileItem = ({ playerData }: MobileProfileDetailsProps) => {
  const { t } = useLocalization()

  return !!playerData ? (
    <>
      <ProfileItem
        label={t('common.realName')}
        value={`${playerData?.firstName || ''} ${playerData?.lastName || ''}`}
      />
      <ProfileItem label={t('common.username')} value={playerData?.username} />
      <ProfileItem
        label={t('common.phone')}
        value={playerData?.contractNumber}
      />
      <ProfileItem
        label={t('common.playerId')}
        value={playerData?.player_id.toString()}
        copy
      />
      <ProfileItem label={t('common.currency')} value={playerData?.currency} />
    </>
  ) : (
    <ActivityIndicator />
  )
}

const ProfileItem = ({ label, value, copy = false }: ProfileItemProps) => {
  const isMobile = !isDesktop()
  return (
    <View
      sx={{
        marginVertical: '$1',
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
          py: 15,
          alignItems: 'center',

          ...(isDesktop() && {
            justifyContent: 'center',
          }),
        }}
      >
        {label && (
          <Text sx={{ minWidth: 150, fontWeight: 'bold' }}>{label}:</Text>
        )}

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
          {value && <Text>{value}</Text>}
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

export default MobileProfileItem
