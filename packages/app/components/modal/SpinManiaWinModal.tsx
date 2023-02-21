import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Image, Text, View } from 'dripsy'
import { MotiImage, MotiView } from 'moti'
import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import IconButton from '../form/IconButton'

const SpinManiaWinModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const amount = getParam('amount')
  const { width, height } = useContainerDimension()
  const { isLandscape } = useOrientation()
  const [gifOpacity, setGifOpacity] = useState(1)

  const textTitle = isLandscape ? 24 : [16, 48]
  const textSubtitle = isLandscape ? 18 : [16, 28]
  const textAmount = isLandscape ? 48 : [48, 72]
  const textSubtitleMargin = isLandscape ? 0 : [0, 24]

  const { currency } = usePlayerProfileQuery(undefined, {
    selectFromResult: (data) => ({
      currency: data.data?.data?.currency as Currency,
    }),
  })

  const handleClose = () => {
    closeModal()
  }

  return (
    <View sx={{ width, alignItems: 'center', justifyContent: 'center' }}>
      <View
        sx={{
          width: isLandscape ? width * 0.5 : width,
          height: height,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <MotiImage
          source={require('app/assets/images/events/cny/ribbon.png')}
          resizeMode={isLandscape ? 'cover' : 'cover'}
          style={{
            position: 'absolute',
            top: isLandscape ? undefined : '7%',
            width: isLandscape ? '150%' : undefined,
            height: isLandscape ? undefined : '75%',
            aspectRatio: 2694 / 2956,
            opacity: 0.7,
          }}
          from={{ scale: 0.1 }}
          animate={{ scale: 1 }}
        /> */}
        <MotiView
          style={{
            width: '100%',
            aspectRatio: 1 / 1,
          }}
          from={{ scale: 0.1 }}
          animate={{ scale: 1 }}
        >
          <ImageBackground
            source={require('app/assets/images/events/spinMania/winner-board.png')}
            resizeMode="contain"
            style={{
              width: '100%',
              aspectRatio: 1 / 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '20%',
            }}
          >
            <View sx={{ width: '55%' }}>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: textTitle,
                  fontWeight: 'bold',
                  color: '$yellowGold',
                }}
              >
                {t('event.winText1')}
              </Text>
              <Text
                sx={{
                  mb: textSubtitleMargin,
                  textAlign: 'center',
                  fontSize: textSubtitle,
                  fontWeight: 'bold',
                  color: '$yellowGold',
                }}
              >
                {t('event.winText2')}
              </Text>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: textAmount,
                  fontWeight: 'bold',
                  color: '$yellowGold',
                }}
              >
                {toCurrency(amount, currency, { symbol: false })}
              </Text>
            </View>
          </ImageBackground>
        </MotiView>

        {/* <MotiImage
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/cny/ribbon-falldown.gif`,
          }}
          onLoad={() => {
            //Hide gif looping twice in app
            setGifOpacity(1)
            setTimeout(() => {
              setGifOpacity(0)
            }, 2000)
          }}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            width,
            height,
          }}
          from={{ opacity: 0 }}
          animate={{ opacity: gifOpacity }}
          transition={{
            type: 'timing',
            delay: 250,
          }}
        /> */}
      </View>

      <View sx={{ position: 'absolute', top: '8%', right: '5%' }}>
        <IconButton
          onPress={handleClose}
          name="cross"
          color="white"
          sx={{
            right: 0,
            zIndex: 10,
          }}
          size={30}
        />
      </View>
    </View>
  )
}

export default SpinManiaWinModal
