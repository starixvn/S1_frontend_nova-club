import Button from 'app/components/common/Button'
import { View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

const HeaderAuthentication = () => {
  const { push } = useRouter()
  return (
    <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
      <Button
        sx={{ mx: '$2', minWidth: 100, borderRadius: 15 }}
        titleProps={{
          sx: {
            fontSize: 14,
            height: 16,
            lineHeight: 18,
          },
        }}
        contentProps={{
          sx: { py: '$2' },
        }}
        onPress={() => push('/auth/login')}
      >
        {t('authentication.login')}
      </Button>
      <Button
        sx={{ bg: '$primary.700', minWidth: 100, borderRadius: 15 }}
        titleProps={{
          sx: {
            fontSize: 14,
            height: 16,
            lineHeight: 18,
          },
        }}
        contentProps={{
          sx: { py: '$2' },
        }}
        onPress={() => push('/auth/register')}
      >
        {t('authentication.register')}
      </Button>
    </View>
  )
}

export default HeaderAuthentication
