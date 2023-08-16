import { LIVECHAT_URL } from '@env'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React, { ComponentProps } from 'react'
import { Linking } from 'react-native'
import { useRouter } from 'solito/router'

const StyledView = styled(View)({
  flexDirection: 'row',
  flexShrink: 1,
  justifyContent: 'center',
  mt: '$4',
})

type ReceiveOTPContactProps = ComponentProps<typeof View>

function ReceiveOTPContact(props: ReceiveOTPContactProps) {
  const { ...rest } = props

  const { t } = useLocalization()
  const { push } = useRouter()

  const handlePressContact = async () => {
    try {
      await Linking.openURL(LIVECHAT_URL)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledView {...rest}>
      <Text sx={{ pl: '$3' }}>
        {t('authentication.noReceiveOTP')}{' '}
        <Text
          sx={{
            color: '$info',
            textDecorationLine: 'underline',
            textTransform: 'capitalize',
          }}
          onPress={handlePressContact}
        >
          {t('footer.contactUs')}
        </Text>
      </Text>
    </StyledView>
  )
}

export default ReceiveOTPContact
