import useLocalization from 'app/provider/localization'
import { View, Text } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React from 'react'

const HeaderDeposit = () => {
  const { t } = useLocalization()
  return (
    <Gradient
      gradient={'button'}
      sx={{
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
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
          {t('common.deposit')}
        </Text>
      </View>
    </Gradient>
  )
}

export default HeaderDeposit
