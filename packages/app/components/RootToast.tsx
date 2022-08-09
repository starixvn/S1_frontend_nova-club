import { View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import Toast, { SuccessToast } from 'react-native-toast-message'

const RootToast = () => {
  return (
    <View
      sx={{
        zIndex: 999,
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Toast
        position="bottom"
        config={{
          success: (props) => (
            <SuccessToast {...props} text1NumberOfLines={2} />
          ),
        }}
      />
    </View>
  )
}

export default RootToast
