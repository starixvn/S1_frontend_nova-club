import React from 'react'
import { Easing } from 'react-native'
import dynamic from 'next/dynamic'
import {
  ModalStackConfig,
  ModalProvider as RNMModalProvider,
  createModalStack,
} from 'react-native-modalfy'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import { ActivityIndicator } from 'dripsy'

type ModalStackConfigValueType = ModalStackConfig extends Record<
  any,
  infer ValueType
>
  ? ValueType
  : never

export type ModalStackParams = {
  AlertModal: {
    message: string
    title?: string
    // actions: ModalAction[]
    onClose(...args: any): any
  }
  ReferralModal: {
    message: string
    title?: string
    // actions: ModalAction[]
    onClose(...args: any): any
  }
  DeleteBankAccountModal: {
    message: string
    title?: string
    // actions: ModalAction[]
    onClose(...args: any): any
  }
  PinModal: { onConfirm(...args: any): any; onForgotPin(...args: any): any }
  NoticeModal: { notice: [] }
  WithdrawalConfirmationModal: {
    withdrawalInfo: Record<any, any>
    bankLogo: string
    fields: Record<any, any>[]
    formik: any
  }
}

type ModalConfigType = Record<keyof ModalStackParams, ModalStackConfigValueType>
type DynamicModalType = keyof typeof _dynamicModal

const _dynamicModal = {
  AlertModal: () => import('app/components/modal/AlertModal'),
  ReferralModal: () => import('app/components/modal/ReferralModal'),
  NoticeModal: () => import('app/components/modal/NoticeModal'),
  DeleteBankAccountModal: () =>
    import('app/components/modal/DeleteBankAccountModal'),
  PinModal: () => import('app/components/modal/PinModal'),
  WithdrawalConfirmationModal: () =>
    import('app/components/modal/WithdrawalConfirmationModal'),
}

function getDynamicComponent(key: DynamicModalType) {
  const LazyComponent = dynamic(_dynamicModal[key], {
    loading: (props) => {
      return (
        <ModalWrapper>
          <ActivityIndicator sx={{ mt: 24 }} color={'$primary'} />
        </ModalWrapper>
      )
    },
  })

  // eslint-disable-next-line react/display-name
  return (props) => <LazyComponent {...props} />
}

const modalConfig: ModalConfigType = {
  AlertModal: {
    modal: getDynamicComponent('AlertModal'),
  },
  ReferralModal: {
    modal: getDynamicComponent('ReferralModal'),
  },
  NoticeModal: {
    modal: getDynamicComponent('NoticeModal'),
  },
  DeleteBankAccountModal: {
    modal: getDynamicComponent('DeleteBankAccountModal'),
  },
  PinModal: {
    modal: getDynamicComponent('PinModal'),
    position: 'bottom',
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
