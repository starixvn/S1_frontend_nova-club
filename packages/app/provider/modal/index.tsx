import useContainerDimension from 'app/hooks/useContainerDimension'
import { Text, View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import {
  ModalProvider as RNMModalProvider,
  createModalStack,
} from 'react-native-modalfy'

/* Consider using this modal for other temporarily / not fullscreen modal  */

const defaultOptions = { backdropOpacity: 0.6 }

const modalConfig = {
  PreLaunchGame: () => {
    const { width, height } = useContainerDimension()

    console.log(Platform.OS, height)
    return (
      <View sx={{ bg: 'green', width, height }}>
        <Text>aasdfajkdh</Text>
      </View>
    )
  },
}

const stack = createModalStack(modalConfig, {
  backdropOpacity: 0.6,
  containerStyle: {
    backgroundColor: 'red',
  },
})

const ModalProvider = ({ children }) => (
  <RNMModalProvider stack={stack}>{children}</RNMModalProvider>
)

export default ModalProvider
