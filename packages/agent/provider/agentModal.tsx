import ModalWrapper from 'app/components/modal/ModalWrapper'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'
import React from 'react'
import { ModalStackConfig } from 'react-native-modalfy'
import { ModalAction } from '../components/Modal/Modal.type'

type ModalStackConfigValueType = ModalStackConfig extends Record<
  any,
  infer ValueType
>
  ? ValueType
  : never

export interface ModalStackParams {
  AgentAlertModal: {
    message: string
    title?: string
    actions: ModalAction[]
    onClose(...args: any): any
  }
  FilterCommissionReportModal: {
    filterOptions: Record<any, any>
    onConfirm(...args: any): any
  }
  FilterTransactionReportModal: {
    filterOptions: Record<any, any>
    onConfirm(...args: any): any
  }
  FilterMemberListingModal: {
    filterOptions: Record<any, any>
    onConfirm(...args: any): any
  }
  FilterAgentListingModal: {
    filterOptions: Record<any, any>
    onConfirm(...args: any): any
  }
  FilterShareholderListingModal: {
    filterOptions: Record<any, any>
    withdrawalInfo: Record<any, any>
    bankLogo?: string
  }
  EditPTModal: {
    id: string
    pt: string
  }
  AgentPinModal: {
    isAgent: boolean
    onConfirm(...args: any): any
  }
  NewRegistrationModal: {
    username: string
    password: string
  }
  AgentCommonConfirmationModal: {
    title: string
    body?: string
    info?: Record<any, any>
    bankLogo?: string
    fields?: Record<any, any>[]
    close?: boolean
    onConfirm(...args: any): any
  }
  AgentLoadingModal: undefined
  AgentSwitchConfirmationModal: undefined
  TurnoverModal: undefined
}

type ModalConfigType = Record<keyof ModalStackParams, ModalStackConfigValueType>

const _dynamicModal = {
  AgentAlertModal: () => import('../components/Modal/AgentAlertModal'),
  FilterCommissionReportModal: () =>
    import('agent/components/Modal/FilterCommissionReportModal'),
  FilterTransactionReportModal: () =>
    import('agent/components/Modal/FilterTransactionReportModal'),
  FilterMemberListingModal: () =>
    import('agent/components/Modal/FilterMemberListingModal'),
  FilterAgentListingModal: () =>
    import('agent/components/Modal/FilterAgentListingModal'),
  FilterShareholderListingModal: () =>
    import('agent/components/Modal/FilterShareholderListingModal'),
  AgentPinModal: () => import('../components/Modal/AgentPinModal'),
  NewRegistrationModal: () =>
    import('../components/Modal/NewRegistrationModal'),
  AgentCommonConfirmationModal: () =>
    import('../components/Modal/AgentCommonConfirmationModal'),
  AgentLoadingModal: () => import('../components/Modal/AgentLoadingModal'),
  EditPTModal: () => import('../components/Modal/EditPTModal'),
  AgentSwitchConfirmationModal: () =>
    import('../components/Modal/AgentSwitchConfirmationModal'),
  TurnoverModal: () => import('../components/Modal/TurnoverModal'),
}

function getDynamicComponent(key: string) {
  const LazyComponent = dynamic(_dynamicModal[key], {
    loading: (props) => {
      return (
        <ModalWrapper>
          <ActivityIndicator sx={{ mt: '$4' }} color={'$lightCyan'} />
        </ModalWrapper>
      )
    },
  })

  // eslint-disable-next-line react/display-name
  return (props) => <LazyComponent {...props} />
}

export const agentModalConfig: ModalConfigType = {
  AgentAlertModal: {
    modal: getDynamicComponent('AgentAlertModal'),
  },
  FilterCommissionReportModal: {
    modal: getDynamicComponent('FilterCommissionReportModal'),
  },
  FilterTransactionReportModal: {
    modal: getDynamicComponent('FilterTransactionReportModal'),
  },
  FilterMemberListingModal: {
    modal: getDynamicComponent('FilterMemberListingModal'),
  },
  FilterAgentListingModal: {
    modal: getDynamicComponent('FilterAgentListingModal'),
  },
  FilterShareholderListingModal: {
    modal: getDynamicComponent('FilterShareholderListingModal'),
  },
  AgentPinModal: {
    modal: getDynamicComponent('AgentPinModal'),
  },
  NewRegistrationModal: {
    modal: getDynamicComponent('NewRegistrationModal'),
  },
  AgentCommonConfirmationModal: {
    modal: getDynamicComponent('AgentCommonConfirmationModal'),
  },
  AgentLoadingModal: {
    modal: getDynamicComponent('AgentLoadingModal'),
  },
  EditPTModal: {
    modal: getDynamicComponent('EditPTModal'),
  },
  AgentSwitchConfirmationModal: {
    modal: getDynamicComponent('AgentSwitchConfirmationModal'),
  },
  TurnoverModal: {
    modal: getDynamicComponent('TurnoverModal'),
  },
}
