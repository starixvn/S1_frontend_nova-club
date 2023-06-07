import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'

const BackgroundImage = () => {
  const { width } = useContainerDimension()

  const isOverBreakpoint = width > 500

  return (
    <>
      <Image
        resizeMode="cover"
        source={require('app/assets/images/events/prediction/background-trophy.jpg')}
        style={[
          StyleSheet.absoluteFill,
          {
            //   aspectRatio: 375 / 667,
            //   width,
            // minHeight: 700,
            position: 'absolute',
            top: isOverBreakpoint ? '-42%' : 0,
            left: isOverBreakpoint ? -20 : -15,
          },
        ]}
      />

      {/* <View
        style={[
          StyleSheet.absoluteFill,
          {
            //   aspectRatio: 375 / 667,
            //   width,
            // minHeight: 700,
            backgroundColor: isOverBreakpoint
              ? 'rgba(0,0,0,0.3)'
              : 'transparent',
          },
        ]}
      /> */}
    </>
  )
}

export default BackgroundImage
