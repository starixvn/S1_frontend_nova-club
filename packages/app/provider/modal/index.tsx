import { agentModalConfig } from 'agent/provider/agentModal'
import LoadingModal from 'app/components/modal/LoadingModal'
import { ActionsProps } from 'app/components/modal/ModalContent'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import { LoginType } from 'app/features/auth/AuthLayout'
import { HomeEventModalData } from 'app/features/home/EventModal/HomeEventModal'
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

export const MODAL_ANIMATION_DELAY = 350

type ModalStackConfigValueType = ModalStackConfig[keyof ModalStackConfig]

type DefaultModalStackParams = {
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
  NotesModal: { id: string; data: Record<any, any>[] }
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
  RegisterModal: {
    t: LoginType
  }
  LoginModal: {
    t: LoginType
  }
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
  DepositQrModal: { qrCode: string }
  DailyCheckInModal: undefined
  RewardGameModal: {
    key: string
  }
  RewardTncModal: {
    content: React.ReactNode
  }
  ActionableModal: {
    actions: ActionsProps[]
    message: string
    isShowHeader: boolean
  }
  HomeEventModal: {
    data: HomeEventModalData[]
  }
  EuroModal: {
    message: string
  }
}

/**
 * `InjectedParamOption` is available after patching `react-native-modalfy`
 * using `yarn patch`. These injected option is only for `react-native-modalfy`
 * parameter.
 *
 * Example:
 * ```ts
 *  const { openModal } = useModal()
 *  openModal('AlertModal', { persistent: true })
 * ```
 */
type InjectedParamOption = {
  /** To disable backdrop click from closing the modal. */
  persistent?: boolean
}
export type ModalStackParams = {
  [key in keyof DefaultModalStackParams]: DefaultModalStackParams[key] extends undefined
    ? InjectedParamOption
    : DefaultModalStackParams[key] & InjectedParamOption
}

type ModalConfigType = Record<keyof ModalStackParams, ModalStackConfigValueType>
type DynamicModalType = keyof typeof _dynamicModal

const _dynamicModal: Record<keyof ModalStackParams, () => Promise<any>> = {
  LoadingModal: () => import('app/components/modal/LoadingModal'),
  AlertModal: () => import('app/components/modal/AlertModal'),
  ReferralModal: () => import('app/components/modal/ReferralModal'),
  NoticeModal: () => import('app/components/modal/NoticeModal'),
  NotesModal: () => import('app/components/modal/NotesModal'),
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
  LoginModal: () =>
    import('desktop-ext/features/auth/login/LoginScreenDesktop'),
  AgentLoginModal: () =>
    import('desktop-ext/features/auth/login/LoginScreenDesktop'),
  DepositCryptoModal: () =>
    import('app/features/deposit/component/DepositCryptoModal'),
  DownloadGuideModal: () =>
    import('desktop-ext/features/download/DownloadGuide'),
  LuckyDrawModal: () => import('app/components/modal/LuckyDrawModal'),
  ForgotPasswordModal: () =>
    import('desktop-ext/features/auth/forgotPassword/ForgotPasswordScreen'),
  DepositQrModal: () => import('app/components/modal/DepositQrModal'),
  DailyCheckInModal: () => import('app/components/modal/DailyCheckInModal'),
  RewardGameModal: () => import('app/components/modal/RewardGameModal'),
  RewardTncModal: () => import('app/components/modal/RewardTncModal'),
  ActionableModal: () => import('app/components/modal/ActionableModal'),
  HomeEventModal: () => import('app/features/home/EventModal/HomeEventModal'),
  EuroModal: () => import('app/components/modal/EuroModal'),
}

function getDynamicComponent(key: DynamicModalType) {
  const LazyComponent = dynamic(_dynamicModal[key], {
    loading: (props) => {
      return (
        <ModalWrapper>
          <ActivityIndicator sx={{ mt: 24 }} color={'$primary.100'} />
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
  NotesModal: {
    modal: getDynamicComponent('NotesModal'),
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
    backBehavior: 'none',
  },
  LoginModal: {
    modal: getDynamicComponent('LoginModal'),
    backBehavior: 'none',
  },
  AgentLoginModal: {
    modal: getDynamicComponent('AgentLoginModal'),
    backBehavior: 'none',
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
    backBehavior: 'none',
  },
  DepositQrModal: {
    modal: getDynamicComponent('DepositQrModal'),
  },
  DailyCheckInModal: {
    modal: getDynamicComponent('DailyCheckInModal'),
  },
  RewardGameModal: {
    modal: getDynamicComponent('RewardGameModal'),
  },
  RewardTncModal: {
    modal: getDynamicComponent('RewardTncModal'),
  },
  ActionableModal: {
    modal: getDynamicComponent('ActionableModal'),
  },
  HomeEventModal: {
    modal: getDynamicComponent('HomeEventModal'),
    transitionOptions: (animatedValue) => ({}),
  },
  EuroModal: {
    modal: getDynamicComponent('EuroModal'),
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
      transform: [
        {
          perspective: 2000,
        },
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 0, 30],
          }),
        },
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1.2, 1, 0.8],
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

  return <RNMModalProvider stack={stack}>{children}</RNMModalProvider>
}

export default ModalProvider
