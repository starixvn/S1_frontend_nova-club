import Button from 'app/components/common/Button'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

const HeaderAuthentication = () => {
  const { push } = useRouter()
  const { t } = useLocalization()

  return (
    <View sx={{ flexDirection: 'row', alignItems: 'center', gap: '$3' }}>
      <Button
        sx={{ minWidth: 100, borderRadius: 15 }}
        contentProps={{
          sx: { py: '$2' },
        }}
        onPress={() => push('/auth/login')}
      >
        {t('authentication.login')}
      </Button>
      <Button
        sx={{ bg: '$primary.300', minWidth: 100, borderRadius: 15 }}
        contentProps={{
          sx: { py: '$2' },
        }}
        titleProps={{ sx: { fontSize: 14 } }}
        onPress={() => push('/auth/register')}
      >
        {t('authentication.register')}
      </Button>
    </View>
  )
}

export default HeaderAuthentication
