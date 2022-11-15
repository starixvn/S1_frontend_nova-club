import ModalWrapper from 'app/components/modal/ModalWrapper'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'
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
  AlertModal: { message: string; onClose(...args: any): any }
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
  PredictionModal: undefined
  ReferralModal: undefined
  LuckyDrawModal: undefined
  WithdrawalConfirmationModal: {
    withdrawalInfo: Record<any, any>
    bankLogo: any
    fields: Record<any, any>[]
    onConfirm(...args: any): any
  }
  UserAgreementModal: undefined
}

type ModalConfigType = Record<keyof ModalStackParams, ModalStackConfigValueType>

const _dynamicModal = {
  LuckyDrawModal: () => import('app/components/modal/LuckyDrawModal'),
  AlertModal: () => import('app/components/modal/AlertModal'),
  DepositConfirmationModal: () =>
    import('app/components/modal/DepositConfirmationModal'),
  DepositUploadModal: () => import('app/components/modal/DepositUploadModal'),
  NoticeModal: () => import('app/components/modal/NoticeModal'),
  PinModal: () => import('app/components/modal/PinModal'),
  PlayerBankDeleteModal: () =>
    import('app/components/modal/PlayerBankDeleteModal'),
  PredictionModal: () => import('app/components/modal/PredictionModal'),
  ReferralModal: () => import('app/components/modal/ReferralModal'),
  WithdrawalConfirmationModal: () =>
    import('app/components/modal/WithdrawalConfirmationModal'),
  UserAgreementModal: () =>
    import('app/features/games/PreLaunchGame/UserAgreementModal'),
}

function getDynamicComponent(key: string) {
  const LazyComponent = dynamic(_dynamicModal[key], {
    loading: (props) => {
      return (
        <ModalWrapper>
          <ActivityIndicator sx={{ mt: '$10' }} color={'$lightCyan'} />
        </ModalWrapper>
      )
    },
  })

  // eslint-disable-next-line react/display-name
  return (props) => <LazyComponent {...props} />
}

/* Consider using this modal for other temporarily / not fullscreen modal  */
const modalConfig: ModalConfigType = {
  LuckyDrawModal: {
    modal: getDynamicComponent('LuckyDrawModal'),
  },
  AlertModal: {
    modal: getDynamicComponent('AlertModal'),
  },
  DepositConfirmationModal: {
    modal: getDynamicComponent('DepositConfirmationModal'),
  },
  DepositUploadModal: {
    modal: getDynamicComponent('DepositUploadModal'),
  },
  NoticeModal: {
    modal: getDynamicComponent('NoticeModal'),
  },
  PinModal: {
    modal: getDynamicComponent('PinModal'),
    position: 'bottom',
  },
  PlayerBankDeleteModal: {
    modal: getDynamicComponent('PlayerBankDeleteModal'),
  },
  PredictionModal: {
    modal: getDynamicComponent('PredictionModal'),
  },
  ReferralModal: {
    modal: getDynamicComponent('ReferralModal'),
  },
  WithdrawalConfirmationModal: {
    modal: getDynamicComponent('WithdrawalConfirmationModal'),
  },
  UserAgreementModal: {
    modal: getDynamicComponent('UserAgreementModal'),
  },
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
