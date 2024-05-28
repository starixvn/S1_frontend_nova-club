import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import Bracket from './Bracket'
import { useGetEuroCupKnockoutQuery } from 'services/euroApi'

const Knockout = () => {
  const { t } = useLocalization()

  const { data } = useGetEuroCupKnockoutQuery()

  return (
    <View sx={{ width: 1000, mx: 'auto' }}>
      {data && data.length > 0 ? (
        <>
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
              width={111}
              height={270}
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
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default Knockout
