import AlertModal from 'app/components/modal/AlertModal'
import DepositConfirmationModal from 'app/components/modal/DepositConfirmationModal'
import PlayerBankDeleteModal from 'app/components/modal/PlayerBankDeleteModal'
import QRTransferModal from 'app/components/modal/QRTransferModal'
import WithdrawalConfirmationModal from 'app/components/modal/WithdrawalConfirmationModal'

import React from 'react'
import { Dimensions, Easing } from 'react-native'
import {
  ModalProvider as RNMModalProvider,
  createModalStack,
} from 'react-native-modalfy'
const { width } = Dimensions.get('screen')

/* Consider using this modal for other temporarily / not fullscreen modal  */
const modalConfig = {
  AlertModal: AlertModal,
  DepositConfirmationModal: DepositConfirmationModal,
  PlayerBankDeleteModal: PlayerBankDeleteModal,
  QRTransferModal: QRTransferModal,
  WithdrawalConfirmationModal: WithdrawalConfirmationModal,
}

const stack = createModalStack(modalConfig, {
  backdropOpacity: 0.6,
  backBehavior: 'pop',
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
        scale: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [1.3, 1, 1],
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
})

const ModalProvider = ({ children }) => {
  return <RNMModalProvider stack={stack}>{children}</RNMModalProvider>
}

export default ModalProvider
