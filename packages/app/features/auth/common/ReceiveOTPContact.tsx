import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

function ReceiveOTPContact() {
  const { t } = useLocalization()
  const { push } = useRouter()

  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('customer-support')

  const handlePressContact = () => {
    push(to, '/customer-support')
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
