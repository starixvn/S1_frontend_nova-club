import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import IconButton from 'app/components/IconButton'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import { toCurrency } from 'app/utils'
import { Currency } from 'utils/constant'
import { Text, View } from 'dripsy'
import { MotiImage, MotiView } from 'moti'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
// import IconButton from '../form/IconButton'

const HalloweenWinModal = ({ modal: { closeModal, getParam } }) => {
  const amount = getParam('amount')
  const { width, height } = useContainerDimension()
  const { isLandscape } = useOrientation()
  const [gifOpacity, setGifOpacity] = useState(1)

  const textTitle = isLandscape ? 24 : [24, 48]
  const textSubtitle = isLandscape ? 18 : [16, 28]
  const textAmount = isLandscape ? 48 : [48, 72]
  const textSubtitleMargin = isLandscape ? 0 : [0, 24]

  const handleClose = () => {
    closeModal()
  }

  const defaultStyles = {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
        <MotiImage
          source={require('app/assets/images/events/halloween/ribbon.png')}
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
        />
        <MotiView
          style={{ width: '100%', aspectRatio: 1 / 1 }}
          from={{ scale: 0.1 }}
          animate={{ scale: 1 }}
        >
          <ImageBackground
            source={require('app/assets/images/events/halloween/winner-board.png')}
            resizeMode="contain"
            style={{
              width: '100%',
              aspectRatio: 770 / 674,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: '12%',
            }}
          >
            <View sx={{ width: '55%' }}>
              <Text
                sx={{
                  ...defaultStyles,
                  fontSize: textTitle,
                }}
              >
                {amount > 0 ? 'XIN CHÚC MỪNG!' : 'RẤT TIẾC! '}
              </Text>
              <Text
                sx={{
                  mb: textSubtitleMargin,
                  ...defaultStyles,
                  fontSize: textSubtitle,
                }}
              >
                {amount > 0
                  ? 'BẠN ĐÃ TRÚNG THƯỞNG'
                  : 'CHÚC BẠN MAY MẮN LẦN SAU. '}
              </Text>
              <Text
                sx={{
                  ...defaultStyles,
                  fontSize: textAmount,
                }}
              >
                {toCurrency(amount, Currency.VND, { symbol: false })}
              </Text>
            </View>
          </ImageBackground>
        </MotiView>

        <MotiImage
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
        />
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

const styles = StyleSheet.create({
  words: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
})
export default HalloweenWinModal
