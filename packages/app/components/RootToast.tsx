import { View, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'

const RootToast = () => {
  const { theme } = useDripsyTheme()
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: theme.colors.$primary[200] }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: theme.colors.$error }}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  }
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
      <Toast position="bottom" config={toastConfig} />
    </View>
  )
}

export default RootToast
