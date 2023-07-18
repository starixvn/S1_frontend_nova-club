import Button from 'app/components/common/Button'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'
import HeaderLanguageToggle from './HeaderLanguageToggle'

const HeaderAuthentication = () => {
  const { push } = useRouter()
  const { t } = useLocalization()

  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: '$2',
      }}
    >
      <Button
        sx={{ minWidth: 100, borderRadius: 20 }}
        contentProps={{
          sx: { py: '$2' },
        }}
        onPress={() => push('/auth/login')}
      >
        {t('authentication.login')}
      </Button>
      <Button
        sx={{ bg: '$primary.300', minWidth: 100, borderRadius: 20 }}
        contentProps={{
          sx: { py: '$2' },
        }}
        titleProps={{ sx: { fontSize: 14 } }}
        onPress={() => push('/auth/register')}
      >
        {t('authentication.register')}
      </Button>
      <HeaderLanguageToggle />
    </View>
  )
}

export default HeaderAuthentication
