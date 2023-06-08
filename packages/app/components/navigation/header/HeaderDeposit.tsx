import useLocalization from 'app/provider/localization'
import { Pressable, Text } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React from 'react'
import { useRouter } from 'solito/router'

const HeaderDeposit = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
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
        onPress={() => push('/deposit')}
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
            fontSize: 10,
            py: 4,
            px: 4,
            lineHeight: 12,
            height: 18,
          }}
        >
          {t('deposit.depositTitle')}
        </Text>
      </Pressable>
    </Gradient>
  )
}

export default HeaderDeposit
