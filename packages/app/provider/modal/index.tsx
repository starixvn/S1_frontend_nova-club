import DepositConfirmationModal from 'app/components/modal/DepositConfirmationModal'
import PlayerBankDeleteModal from 'app/components/modal/PlayerBankDeleteModal'
import QRTransferModal from 'app/components/modal/QRTransferModal'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { Text, View } from 'dripsy'
import React from 'react'
import { Easing, Platform } from 'react-native'
import {
  ModalProvider as RNMModalProvider,
  createModalStack,
} from 'react-native-modalfy'

/* Consider using this modal for other temporarily / not fullscreen modal  */
const defaultOptions = {
  transitionOptions: (animatedValue) => ({
    opacity: animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0.9],
    }),
    transform: [
      {
        perspective: 2000,
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 0, -300],
        }),
      },
      {
        rotateX: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: ['0deg', '0deg', '90deg'],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0.1, 1, 0.9],
        }),
      },
    ],
  }),
  animateInConfig: {
    easing: Easing.bezier(0.42, -0.03, 0.27, 0.95),
    duration: 450,
  },
  animateOutConfig: {
    easing: Easing.bezier(0.42, -0.03, 0.27, 0.95),
    duration: 450,
  },
}

const modalConfig = {
  PreLaunchGame: () => {
    const { width, height } = useContainerDimension()

    return (
      <View sx={{ bg: 'green', width, height }}>
        <Text>aasdfajkdh</Text>
      </View>
    )
  },
  DepositConfirmationModal: DepositConfirmationModal,
  PlayerBankDeleteModal: PlayerBankDeleteModal,
  QRTransferModal: QRTransferModal,
}

const stack = createModalStack(modalConfig, {
  backdropOpacity: 0.6,
})

const ModalProvider = ({ children }) => (
  <RNMModalProvider stack={stack}>{children}</RNMModalProvider>
)

export default ModalProvider
