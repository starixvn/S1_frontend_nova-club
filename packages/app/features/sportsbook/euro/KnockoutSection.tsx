import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import Bracket from './Bracket'

const KnockoutSection = () => {
  const { t } = useLocalization()

  return (
    <View>
      <View
        sx={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/final-trophy.png`}
          width={62}
          height={150}
          alt=""
        />
        <Text
          sx={{
            position: 'absolute',
            fontWeight: 'bold',
            color: '$primaryEuro.500',
          }}
        >
          {t('event.euro.rules.round5')}
        </Text>
      </View>
      <Bracket />
    </View>
  )
}

export default KnockoutSection
