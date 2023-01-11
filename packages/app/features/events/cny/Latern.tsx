import { MotifiedImage } from 'app/components/common/Image'
import { View } from 'dripsy'
import React from 'react'

const PADDING_LANTERN = '10%'
const LANTERN_WIDTH = '25%'
const SWING_WIDTH = 10
const ROTATE_WIDTH = SWING_WIDTH * 0.5

const Lantern = () => {
  return (
    <View
      pointerEvents="none"
      sx={{
        position: 'absolute',
        top: -2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 2,
        elevation: 2,
      }}
    >
      <MotifiedImage
        source={require('app/assets/images/events/cny/lantern02.png')}
        resizeMode="contain"
        style={{
          alignSelf: 'flex-start',
          marginLeft: PADDING_LANTERN,
          width: LANTERN_WIDTH,
          aspectRatio: 200 / 340,
        }}
        from={{
          translateX: SWING_WIDTH,
          rotate: `-${ROTATE_WIDTH}deg`,
        }}
        animate={{
          rotate: `${ROTATE_WIDTH}deg`,
          translateX: -SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 5000,
          delay: 25,
        }}
      />
      <MotifiedImage
        source={require('app/assets/images/events/cny/lantern01.png')}
        resizeMode="contain"
        style={{
          marginRight: PADDING_LANTERN,
          width: LANTERN_WIDTH,
          aspectRatio: 200 / 420,
        }}
        from={{
          translateX: -SWING_WIDTH,
          rotate: `${ROTATE_WIDTH}deg`,
        }}
        animate={{
          rotate: `-${ROTATE_WIDTH}deg`,
          translateX: SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 5000,
          delay: 25,
        }}
      />
    </View>
  )
}

export default Lantern
