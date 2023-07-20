import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import BouncePressable from 'app/components/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { DEV_DOMAIN } from '../../../../../apps/next/config/env'

const ShareCode = () => {
  const { t } = useLocalization()

  const { data } = usePlayerProfileQuery()
  const referralLink = `${DEV_DOMAIN}/download?ref=${data?.referral_code}`

  return (
    <View sx={{ width: '50%', alignItems: 'center' }}>
      <Text sx={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
        {t('referral.shareMessage')}
      </Text>
      <Text
        sx={{
          fontSize: 12,
          fontWeight: '700',
          textAlign: 'center',
          marginTop: 10,
          userSelect: 'none',
        }}
      >
        {t('referral.shareContent')}
      </Text>
      {data && (
        <BouncePressable
          onPress={() => copyToClipboard(referralLink)}
          sx={{
            bg: 'rgba(255,255,255,0.3)',
            borderRadius: 20,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            px: '$3',
            py: 1,
          }}
        >
          <Text sx={{ fontSize: 14, mx: '$1', fontWeight: 'bold' }}>
            {t('common.copy')}
          </Text>
          <Icon
            name={'copy'}
            color={'white'}
            size={20}
            sx={{ padding: 5, mx: '$1' }}
          />
        </BouncePressable>
      )}
    </View>
  )
}

export default ShareCode
