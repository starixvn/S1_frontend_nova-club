import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Image, Text, View } from 'dripsy'
import { MotiImage, MotiView } from 'moti'
import React from 'react'
import { ImageBackground } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import IconButton from '../form/IconButton'

const CnyWinModal = ({ modal: { closeModal, getParam } }) => {
  const amount = getParam('amount')
  const { width, height } = useContainerDimension()
  const { isLandscape } = useOrientation()

  const textTitle = isLandscape ? 24 : [24, 48]
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
        <MotiImage
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
        />
        <MotiView
          style={{ width: '100%', aspectRatio: 1 / 1 }}
          from={{ scale: 0.1 }}
          animate={{ scale: 1 }}
        >
          <ImageBackground
            source={require('app/assets/images/events/cny/winner-board.png')}
            resizeMode="contain"
            style={{
              width: '100%',
              aspectRatio: 1 / 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: '12%',
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
                CHÚC MỪNG!
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
                BẠN ĐÃ NHẬN ĐƯỢC LÌ XÌ
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

        <MotiImage
          source={require('app/assets/images/events/cny/ribbon-falldown.gif')}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            width,
            height,
          }}
          from={{ opacity: 0 }}
          animate={{ opacity: [1, 1, 1, 1, 0] }}
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

export default CnyWinModal
