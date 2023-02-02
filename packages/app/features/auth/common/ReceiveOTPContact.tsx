import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'

function ReceiveOTPContact() {
  const { t } = useLocalization()
  const { push } = useContextualRouter()

  const handlePressContact = () => {
    push('/customer-support')
  }

  return (
    <View
      sx={{
        flexDirection: 'row',
        flexShrink: 1,
        justifyContent: 'center',
        mt: '$4',
      }}
    >
      <Text variant="xs" sx={{ pl: '$3' }}>
        {t('auth.noReceiveOTP')}{' '}
        <Text
          variant="xs"
          sx={{ color: '$orange', textDecorationLine: 'underline' }}
          onPress={handlePressContact}
        >
          {t('common.contactUs')}
        </Text>
      </Text>
    </View>
  )
}

export default ReceiveOTPContact
