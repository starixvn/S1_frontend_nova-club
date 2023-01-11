import { MotifiedImage } from 'app/components/common/Image'
import { View } from 'dripsy'
import { MotiImage } from 'moti'
import React from 'react'
import { Easing } from 'react-native-reanimated'

const CLOUD_DURATION_01 = 9750
const CLOUD_DURATION_02 = 9500
const CLOUD_DURATION_03 = 9750
const CLOUD_DURATION_04 = 10000
const SWING_WIDTH = 30

const Cloud = () => {
  return (
    <View
      sx={{
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '20%',
      }}
    >
      <MotiImage
        source={require('app/assets/images/events/cny/cloud04.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          height: undefined,
          width: '150%',
          aspectRatio: 9 / 2,
        }}
        from={{
          translateX: -SWING_WIDTH,
        }}
        animate={{
          translateX: SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: CLOUD_DURATION_04,
        }}
      />
      <MotiImage
        source={require('app/assets/images/events/cny/cloud02.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          height: undefined,
          width: '150%',
          aspectRatio: 6 / 1,
        }}
        from={{
          translateX: SWING_WIDTH,
        }}
        animate={{
          translateX: -SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: CLOUD_DURATION_02,
        }}
      />
      <MotiImage
        source={require('app/assets/images/events/cny/cloud03.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          height: undefined,
          width: '150%',
          aspectRatio: 9 / 2,
        }}
        from={{
          translateX: -SWING_WIDTH,
        }}
        animate={{
          translateX: SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: CLOUD_DURATION_03,
        }}
      />
      <MotiImage
        source={require('app/assets/images/events/cny/cloud01.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          height: undefined,
          width: '150%',
          aspectRatio: 9 / 2,
        }}
        from={{
          translateX: SWING_WIDTH,
        }}
        animate={{
          translateX: -SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: CLOUD_DURATION_01,
        }}
      />
    </View>
  )
}

export default Cloud
