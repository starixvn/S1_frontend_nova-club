import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import Bracket from './Bracket'
import { useGetEuroCupKnockoutQuery } from 'services/euroApi'
import { useWindowDimensions } from 'react-native'

const KnockoutSection = () => {
  const { t } = useLocalization()
  const { width } = useWindowDimensions()

  const { data } = useGetEuroCupKnockoutQuery()

  return (
    <View sx={{ px: '$2' }}>
      {data && data?.length > 0 ? (
        <View
          sx={{
            alignItems: 'center',
            transform: [{ scale: width < 400 ? 0.8 : 1 }],
          }}
        >
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
              height={120}
              alt=""
            />
            <Text
              sx={{
                position: 'absolute',
                fontWeight: 'bold',
                color: '$primaryEuro.500',
              }}
            >
              {t('event.euro.knockout.stage4')}
            </Text>
          </View>

          <Bracket />
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default KnockoutSection
