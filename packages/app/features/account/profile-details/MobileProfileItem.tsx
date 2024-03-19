import IconButton from 'app/components/IconButton'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { ActivityIndicator, Text, View } from 'dripsy'
import React from 'react'
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
      <ProfileItem label={t('common.dob')} value={playerData?.birthdate} />
      <ProfileItem
        label={t('common.playerId')}
        value={playerData?.referral_code.toString()}
        copy
      />
      <ProfileItem label={t('common.currency')} value={playerData?.currency} />
      <ProfileItem
        label={t('contact.telegram')}
        value={playerData?.telegram_id}
      />
    </>
  ) : (
    <ActivityIndicator sx={{ minHeight: 300 }} size={'large'} />
  )
}

const ProfileItem = ({ label, value, copy = false }: ProfileItemProps) => {
  const desktop = useIsDesktop()

  return (
    <View
      sx={{
        marginVertical: '$1',
        ...(!desktop && {
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

          ...(desktop && {
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
            ...(desktop
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
