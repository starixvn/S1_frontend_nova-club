import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import BouncePressable from 'app/components/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { Pressable, Row, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { SolitoImage } from 'solito/image'
import { TitleText } from './EuroText'
import useIsDesktop from 'app/hooks/useIsDesktop'

const COUNTRY = [
  'germany',
  'scotland',
  'hungary',
  'switzerland',
  'germany',
  'scotland',
  'hungary',
  'switzerland',
  'germany',
  'scotland',
  'hungary',
  'switzerland',
  'germany',
  'scotland',
  'hungary',
  'switzerland',
  'germany',
  'scotland',
  'hungary',
  'switzerland',
  'germany',
  'scotland',
  'hungary',
  'switzerland',
]

const PredictionStage = ({ contentWidth }) => {
  const { t } = useLocalization()
  const isDesktop = useIsDesktop()
  const [selected, setSelected] = useState<number[]>([])

  const handleSelected = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((el) => el !== index))
    } else if (selected.length >= 16) {
      return
    } else {
      setSelected([...selected, index])
    }
  }

  const handlePress = () => {
    console.log('first')
  }

  return (
    <View sx={{ flex: 1, width: contentWidth, mt: -36 }}>
      <ImageBackground
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/${
            isDesktop ? 'frame-desktop' : 'frame-mobile'
          }.png`,
        }}
        resizeMode="stretch"
        alt=""
        style={{ alignItems: 'center' }}
      >
        <View sx={{ m: '$4', alignItems: 'center' }}>
          <TitleText>
            {t('event.euro.round', { stage: 16 }).toUpperCase()}
          </TitleText>
          <Row
            sx={{
              flexWrap: 'wrap',
              mt: '$3',
              rowGap: '$3',
            }}
          >
            {COUNTRY.map((item, index) => {
              const active = selected.includes(index)

              return (
                <View
                  key={index}
                  sx={{
                    alignItems: 'center',
                    width: isDesktop ? '12.5%' : '25%',
                  }}
                >
                  <Pressable onPress={() => handleSelected(index)}>
                    <View
                      sx={{
                        borderWidth: 4,
                        borderColor: active ? '#00FF62' : 'transparent',
                        borderRadius: 50,
                      }}
                    >
                      <SolitoImage
                        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/flags/${item}.png`}
                        width={48}
                        height={48}
                        alt=""
                        style={{
                          borderWidth: 4,
                          borderColor: active ? '#00FF62' : 'transparent',
                          borderRadius: 50,
                        }}
                      />
                    </View>
                  </Pressable>
                  <Text sx={{ fontSize: 10 }}>{item.toUpperCase()}</Text>
                </View>
              )
            })}
          </Row>
        </View>
        <BouncePressable onPress={handlePress}>
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/btn-submit-on.png`}
            width={200}
            height={40}
            alt=""
          />
        </BouncePressable>
      </ImageBackground>
    </View>
  )
}

export default PredictionStage
