import useContainerDimension from 'app/hooks/useContainerDimension'
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

  const { currency } = usePlayerProfileQuery(undefined, {
    selectFromResult: (data) => ({
      currency: data.data?.data?.currency as Currency,
    }),
  })

  const handleClose = () => {
    closeModal()
  }

  return (
    <>
      <View
        sx={{
          width: width,
          height: height,
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MotiImage
          source={require('app/assets/images/events/cny/ribbon.png')}
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            position: 'absolute',
            top: '7%',
            width: undefined,
            height: '75%',
            aspectRatio: 2694 / 2956,
            opacity: 0.7,
          }}
          from={{ scale: 0.1 }}
          animate={{ scale: 1 }}
        />
        <MotiView
          style={{ width: width, aspectRatio: 1 / 1, height: width }}
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
                  fontSize: [24, 48],
                  fontWeight: 'bold',
                  color: '$yellowGold',
                }}
              >
                CHÚC MỪNG!
              </Text>
              <Text
                sx={{
                  mb: [0, 24],
                  textAlign: 'center',
                  fontSize: [16, 28],
                  fontWeight: 'bold',
                  color: '$yellowGold',
                }}
              >
                BẠN ĐÃ NHẬN ĐƯỢC LÌ XÌ
              </Text>
              <Text
                sx={{
                  textAlign: 'center',
                  fontSize: [48, 72],
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
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            delay: 500,
          }}
        />
        <View sx={{ position: 'absolute', top: '8%', right: '10%' }}>
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
    </>
  )
}

export default CnyWinModal
