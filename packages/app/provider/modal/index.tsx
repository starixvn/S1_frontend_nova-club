import { agentModalConfig } from 'agent/provider/agentModal'
import LoadingModal from 'app/components/modal/LoadingModal'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import { LoginType } from 'app/features/auth/AuthTypeSelection'
import { ActivityIndicator, useResponsiveValue } from 'dripsy'
import dynamic from 'next/dynamic'
import React from 'react'
import { Easing } from 'react-native'
import {
  ModalStackConfig,
  ModalProvider as RNMModalProvider,
  createModalStack,
} from 'react-native-modalfy'
import { SubmitDepositCryptoItem } from 'services/deposit.type'

type ModalStackConfigValueType = ModalStackConfig extends Record<
  any,
  infer ValueType
>
  ? ValueType
  : never

export type ModalStackParams = {
  LoadingModal: undefined
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
  UploadBankSlipModal: {
    depositInfo: Record<any, any>
  }
  DepositConfirmationModal: {
    amount: string
    callback(...args: any): any
  }
  RegisterModal: undefined
  DownloadGuideModal: {
    label: string
    onClose(...args: any): any
  }
  AgentLoginModal: {
    t: LoginType
  }
  DepositCryptoModal: { data: SubmitDepositCryptoItem }
  LuckyDrawModal: undefined
  ForgotPasswordModal: {
    t: LoginType
  }
  EventPopupModal: undefined
}

type ModalConfigType = Record<keyof ModalStackParams, ModalStackConfigValueType>
type DynamicModalType = keyof typeof _dynamicModal

const _dynamicModal: Record<keyof ModalStackParams, () => Promise<any>> = {
  LoadingModal: () => import('app/components/modal/LoadingModal'),
  AlertModal: () => import('app/components/modal/AlertModal'),
  ReferralModal: () => import('app/components/modal/ReferralModal'),
  NoticeModal: () => import('app/components/modal/NoticeModal'),
  DeleteBankAccountModal: () =>
    import('app/components/modal/DeleteBankAccountModal'),
  PinModal: () => import('app/components/modal/PinModal'),
  WithdrawalConfirmationModal: () =>
    import('app/components/modal/WithdrawalConfirmationModal'),
  UploadBankSlipModal: () =>
    import('app/features/deposit/component/UploadBankSlipModal'),
  DepositConfirmationModal: () =>
    import('app/features/deposit/bank-transfer/DepositConfirmationModal'),
  RegisterModal: () =>
    import('desktop-ext/features/auth/register/RegisterScreen'),
  AgentLoginModal: () =>
    import('desktop-ext/features/auth/login/LoginScreenDesktop'),
  DepositCryptoModal: () =>
    import('app/features/deposit/component/DepositCryptoModal'),
  DownloadGuideModal: () =>
    import('desktop-ext/features/download/DownloadGuide'),
  LuckyDrawModal: () => import('app/components/modal/LuckyDrawModal'),
  ForgotPasswordModal: () =>
    import('desktop-ext/features/auth/forgotPassword/ForgotPasswordScreen'),
  EventPopupModal: () => import('app/components/modal/EventPopupModal'),
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
  LoadingModal: {
    modal: LoadingModal,
    backBehavior: 'none',
  },
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
  UploadBankSlipModal: {
    modal: getDynamicComponent('UploadBankSlipModal'),
  },
  DepositConfirmationModal: {
    modal: getDynamicComponent('DepositConfirmationModal'),
  },
  RegisterModal: {
    modal: getDynamicComponent('RegisterModal'),
  },
  AgentLoginModal: {
    modal: getDynamicComponent('AgentLoginModal'),
  },
  DepositCryptoModal: {
    modal: getDynamicComponent('DepositCryptoModal'),
  },
  DownloadGuideModal: {
    modal: getDynamicComponent('DownloadGuideModal'),
  },
  LuckyDrawModal: {
    modal: getDynamicComponent('LuckyDrawModal'),
  },
  ForgotPasswordModal: {
    modal: getDynamicComponent('ForgotPasswordModal'),
  },
  EventPopupModal: {
    modal: getDynamicComponent('EventPopupModal'),
  },
  ...agentModalConfig,
}

const ModalProvider = ({ children }) => {
  const stack = createModalStack(modalConfig, {
    containerStyle: {
      maxWidth: useResponsiveValue([768, 768, '100%']),
      zIndex: 2,
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

  return <RNMModalProvider stack={stack}>{children}</RNMModalProvider>
}

export default ModalProvider
