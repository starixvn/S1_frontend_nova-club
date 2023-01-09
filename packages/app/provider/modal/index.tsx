import LoadingModal from 'app/components/modal/LoadingModal'
import { ModalAction } from 'app/components/modal/Modal.type'
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
  LoadingModal: undefined
  AlertModal: {
    message: string
    title?: string
    actions: ModalAction[]
    onClose(...args: any): any
  }
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
  AffCupModal: undefined
  ReferralModal: undefined
  LuckyDrawModal: undefined
  CnyLuckyDrawModal: undefined
  WithdrawalConfirmationModal: {
    withdrawalInfo: Record<any, any>
    bankLogo: any
    fields: Record<any, any>[]
    onConfirm(...args: any): any
  }
}

type ModalConfigType = Record<keyof ModalStackParams, ModalStackConfigValueType>

const _dynamicModal = {
  CnyLuckyDrawModal: () => import('app/components/modal/CnyLuckyDrawModal'),
  LuckyDrawModal: () => import('app/components/modal/LuckyDrawModal'),
  AlertModal: () => import('app/components/modal/AlertModal'),
  LoadingModal: () => import('app/components/modal/LoadingModal'),
  DepositConfirmationModal: () =>
    import('app/components/modal/DepositConfirmationModal'),
  DepositUploadModal: () => import('app/components/modal/DepositUploadModal'),
  NoticeModal: () => import('app/components/modal/NoticeModal'),
  PinModal: () => import('app/components/modal/PinModal'),
  PlayerBankDeleteModal: () =>
    import('app/components/modal/PlayerBankDeleteModal'),
  PredictionModal: () => import('app/components/modal/PredictionModal'),
  AffCupModal: () => import('app/components/modal/AffCupModal'),
  ReferralModal: () => import('app/components/modal/ReferralModal'),
  WithdrawalConfirmationModal: () =>
    import('app/components/modal/WithdrawalConfirmationModal'),
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

const modalConfig: ModalConfigType = {
  CnyLuckyDrawModal: {
    modal: getDynamicComponent('CnyLuckyDrawModal'),
  },
  LuckyDrawModal: {
    modal: getDynamicComponent('LuckyDrawModal'),
  },
  LoadingModal: {
    modal: LoadingModal,
    backBehavior: 'none',
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
  AffCupModal: {
    modal: getDynamicComponent('AffCupModal'),
  },
  ReferralModal: {
    modal: getDynamicComponent('ReferralModal'),
  },
  WithdrawalConfirmationModal: {
    modal: getDynamicComponent('WithdrawalConfirmationModal'),
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
