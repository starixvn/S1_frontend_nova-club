import Button from 'app/components/common/Button'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'

const HeaderAuthentication = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const desktop = isDesktop()
  const { openModal } = useModal()
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
        onPress={() =>
          desktop ? openModal('RegisterModal') : push('/auth/register')
        }
      >
        {t('authentication.register')}
      </Button>
    </View>
  )
}

export default HeaderAuthentication
