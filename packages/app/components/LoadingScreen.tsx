import { ActivityIndicator, View } from 'dripsy'
import React from 'react'

const LoadingScreen = () => {
  return (
    <View
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'black',
        opacity: 0.5,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  )
}

export default LoadingScreen
