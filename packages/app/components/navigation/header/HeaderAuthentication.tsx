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
        sx={{ minWidth: 90, borderRadius: 20 }}
        contentStyle={{
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 6,
          paddingBottom: 6,
        }}
        onPress={() => push('/auth/login')}
      >
        {t('authentication.login')}
      </Button>
      {/* <Button
        sx={{ bg: '$primary.300', minWidth: 90, borderRadius: 20 }}
        contentStyle={{
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 6,
          paddingBottom: 6,
        }}
        titleProps={{ sx: { fontSize: 14 } }}
        onPress={() => push('/auth/register')}
      >
        {t('authentication.register')}
      </Button> */}
      <HeaderLanguageToggle />
    </View>
  )
}

export default HeaderAuthentication
