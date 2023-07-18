import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import BouncePressable from 'app/components/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'

const ShareCode = () => {
  const { t } = useLocalization()

  const { data } = usePlayerProfileQuery()

  return (
    <View sx={{ width: '50%', alignItems: 'center' }}>
      <Text sx={{ fontSize: 20, fontWeight: '500' }}>
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
      <BouncePressable
        onPress={() => copyToClipboard(data?.referral_code)}
        sx={{
          bg: '$primary.500',
          padding: 10,
          borderRadius: 20,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text sx={{ fontSize: 14 }}>{t('referral.code')}</Text>
        <Icon name={'copy'} color={'white'} size={12} sx={{ padding: 5 }} />
      </BouncePressable>
    </View>
  )
}

export default ShareCode
