import AlertDialogModal from 'app/components/modal/AlertDialogModal'
import AlertModal from 'app/components/modal/AlertModal'
import DepositConfirmationModal from 'app/components/modal/DepositConfirmationModal'
import DepositUploadModal from 'app/components/modal/DepositUploadModal'
import NoticeModal from 'app/components/modal/NoticeModal'
import PinModal from 'app/components/modal/PinModal'
import PlayerBankDeleteModal from 'app/components/modal/PlayerBankDeleteModal'
import ReferralModal from 'app/components/modal/ReferralModal'
import WithdrawalConfirmationModal from 'app/components/modal/WithdrawalConfirmationModal'
import UserAgreementModal from 'app/features/games/PreLaunchGame/UserAgreementModal'

import React from 'react'
import { Easing } from 'react-native'
import {
  createModalStack,
  ModalProvider as RNMModalProvider,
  ModalStackConfig,
} from 'react-native-modalfy'

type ModalStackConfigValueType = ModalStackConfig extends Record<
  any,
  infer ValueType
>
  ? ValueType
  : never

export interface ModalStackParams {
  AlertModal: undefined
  AlertDialogModal: { message: string; callback(...args: any): any }
  DepositConfirmationModal: { amount: number; callback(...args: any): any }
  DepositUploadModal: {
    descInfo: Record<any, any>
    bankLogo: any
    fields: Record<any, any>[]
    onConfirm(...args: any): any
  }
  NoticeModal: { notice: [] }
  PinModal: { onConfirm(...args: any): any; onForgotPin(...args: any): any }
  PlayerBankDeleteModal: { bank: Record<any, any> }
  ReferralModal: undefined
  WithdrawalConfirmationModal: {
    withdrawalInfo: Record<any, any>
    bankLogo: any
    fields: Record<any, any>[]
    onConfirm(...args: any): any
  }
  UserAgreementModal: undefined
}

type ModalConfigType = Record<keyof ModalStackParams, ModalStackConfigValueType>

/* Consider using this modal for other temporarily / not fullscreen modal  */
const modalConfig: ModalConfigType = {
  AlertModal: AlertModal,
  AlertDialogModal: AlertDialogModal,
  DepositConfirmationModal: DepositConfirmationModal,
  DepositUploadModal: DepositUploadModal,
  NoticeModal: NoticeModal,
  PinModal: {
    modal: PinModal,
    position: 'bottom',
  },
  PlayerBankDeleteModal: PlayerBankDeleteModal,
  ReferralModal: ReferralModal,
  WithdrawalConfirmationModal: WithdrawalConfirmationModal,
  UserAgreementModal,
}

const stack = createModalStack(modalConfig, {
  containerStyle: {
    maxWidth: 768,
  },
  backdropOpacity: 0.6,
  backBehavior: 'pop',
  disableFlingGesture: true,
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
    duration: 300,
  },
  animateOutConfig: {
    easing: Easing.bezier(0.42, -0.03, 0.27, 0.95),
    duration: 300,
  },
})

const ModalProvider = ({ children }) => {
  return <RNMModalProvider stack={stack}>{children}</RNMModalProvider>
}

export default ModalProvider
