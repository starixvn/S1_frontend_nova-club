import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { Pressable, Text } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React from 'react'
import { useRouter } from 'solito/router'

const HeaderDeposit = ({ isPlayerName }: { isPlayerName: boolean }) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const desktop = isDesktop()
  const { showAlert } = useAlert()

  const handleDesktopAccountVerification = () => {
    showAlert(
      t('accountVerification.secondaryTitle') +
        '\n' +
        t('accountVerification.remark')
    )
    push('/account/profile-details')
  }
  return (
    <Gradient
      gradient={'button'}
      sx={{
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => {
          isPlayerName
            ? push('/deposit')
            : desktop
            ? handleDesktopAccountVerification()
            : push('/account/account-verification')
        }}
        sx={{
          borderRadius: 50,
          borderWidth: 2,
          m: 1,
          borderColor: '$primary.700',
        }}
      >
        <Text
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            ...(desktop
              ? {
                  px: '$2',
                  lineHeight: 32,
                  height: 30,
                  fontSize: [14, 14, 14, 14, 16],
                }
              : {
                  fontSize: 10,
                  py: 4,
                  px: 4,
                  lineHeight: 12,
                  height: 18,
                }),
          }}
        >
          {t('deposit.depositTitle')}
        </Text>
      </Pressable>
    </Gradient>
  )
}

export default HeaderDeposit
