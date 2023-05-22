import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { Text } from 'dripsy'
import Image from 'app/components/common/Image'
import React from 'react'

const WelcomeSection = () => {
  const { t } = useLocalization()
  return (
    <DripsyGradient
      colors={['#0B6598', '#045C8D']}
      sx={{
        height: 90,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../../assets/images/logo.png')}
        sx={{ height: 40, aspectRatio: 201 / 72 }}
      />
      <Text
        sx={{
          color: '#00ffff',
          fontSize: '$2',
          fontWeight: 'bold',
          p: '$1',
        }}
      >
        {t('auth.welcome')}
      </Text>
    </DripsyGradient>
  )
}

export default WelcomeSection
