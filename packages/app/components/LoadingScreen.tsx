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
      <View
        sx={{
          width: 200,
          aspectRatio: 1,
          bg: 'black',
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    </View>
  )
}

export default LoadingScreen
