import useOrientation from 'app/hooks/useOrientation'
import { View } from 'dripsy'
import { MotiImage } from 'moti'
import React, { memo } from 'react'

const CLOUD_DURATION_01 = 9750
const CLOUD_DURATION_02 = 9500
const CLOUD_DURATION_03 = 9750
const CLOUD_DURATION_04 = 10000
const SWING_WIDTH = 30
const BOTTOM_CLOUD = -20

const Cloud = () => {
  const { isLandscape } = useOrientation()

  return (
    <View
      pointerEvents="none"
      sx={{
        position: 'absolute',
        bottom: isLandscape ? '-15%' : 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '20%',
      }}
    >
      <MotiImage
        source={require('app/assets/images/events/valentine/grass-right.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          height: undefined,
          width: '50%',
          right: 0,
          bottom: 30,
          aspectRatio: 280 / 184,
        }}
        // from={{
        //   translateX: -SWING_WIDTH,
        // }}
        // animate={{
        //   translateX: SWING_WIDTH,
        // }}
        // transition={{
        //   loop: true,
        //   type: 'timing',
        //   duration: CLOUD_DURATION_04,
        // }}
      />

      <MotiImage
        source={require('app/assets/images/events/valentine/flower-left.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          left: '35%',
          height: undefined,
          width: 30,
          bottom: isLandscape ? 150 : 90,
          aspectRatio: 53 / 131,
        }}
        // from={{
        //   translateX: -SWING_WIDTH,
        // }}
        // animate={{
        //   translateX: SWING_WIDTH,
        // }}
        // transition={{
        //   loop: true,
        //   type: 'timing',
        //   duration: CLOUD_DURATION_03,
        // }}
      />
      <MotiImage
        source={require('app/assets/images/events/valentine/grass-left.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          height: undefined,
          width: '40%',
          bottom: 30,
          aspectRatio: 281 / 157,
        }}
        // from={{
        //   translateX: SWING_WIDTH,
        // }}
        // animate={{
        //   translateX: -SWING_WIDTH,
        // }}
        // transition={{
        //   loop: true,
        //   type: 'timing',
        //   duration: CLOUD_DURATION_02,
        // }}
      />

      <MotiImage
        source={require('app/assets/images/events/valentine/flower-right.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          right: '30%',
          height: undefined,
          width: 45,
          bottom: isLandscape ? 150 : 40,
          aspectRatio: 82 / 225,
        }}
        // from={{
        //   translateX: -SWING_WIDTH,
        // }}
        // animate={{
        //   translateX: SWING_WIDTH,
        // }}
        // transition={{
        //   loop: true,
        //   type: 'timing',
        //   duration: CLOUD_DURATION_03,
        // }}
      />
      <MotiImage
        source={require('app/assets/images/events/valentine/cloud-back.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          bottom: BOTTOM_CLOUD,
          height: undefined,
          width: '200%',
          aspectRatio: 1123 / 350,
        }}
        // from={{
        //   translateX: -SWING_WIDTH,
        // }}
        // animate={{
        //   translateX: SWING_WIDTH,
        // }}
        // transition={{
        //   loop: true,
        //   type: 'timing',
        //   duration: CLOUD_DURATION_03,
        // }}
      />

      <MotiImage
        source={require('app/assets/images/events/valentine/bear.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          left: isLandscape ? '12%' : 15,
          bottom: isLandscape ? 50 : 0,
          height: undefined,
          width: 110,
          aspectRatio: 208 / 448,
        }}
        // from={{
        //   translateX: -SWING_WIDTH,
        // }}
        // animate={{
        //   translateX: SWING_WIDTH,
        // }}
        // transition={{
        //   loop: true,
        //   type: 'timing',
        //   duration: CLOUD_DURATION_03,
        // }}
      />
      <MotiImage
        source={require('app/assets/images/events/valentine/cloud.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          left: '-50%',
          bottom: BOTTOM_CLOUD,
          height: undefined,
          width: '100%',
          aspectRatio: 687 / 236,
        }}
        // from={{
        //   translateX: SWING_WIDTH,
        // }}
        // animate={{
        //   translateX: -SWING_WIDTH,
        // }}
        // transition={{
        //   loop: true,
        //   type: 'timing',
        //   duration: CLOUD_DURATION_01,
        // }}
      />
      <MotiImage
        source={require('app/assets/images/events/valentine/cloud.png')}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          position: 'absolute',
          right: '-50%',
          bottom: BOTTOM_CLOUD,
          height: undefined,
          width: '100%',
          aspectRatio: 687 / 236,
        }}
        // from={{
        //   translateX: SWING_WIDTH,
        // }}
        // animate={{
        //   translateX: -SWING_WIDTH,
        // }}
        // transition={{
        //   loop: true,
        //   type: 'timing',
        //   duration: CLOUD_DURATION_01,
        // }}
      />
    </View>
  )
}

export default memo(Cloud)
