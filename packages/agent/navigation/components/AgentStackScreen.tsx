import { StackNavigationOptions } from '@react-navigation/stack'
import AgentDetailsScreen from 'agent/features/agent/AgentDetails'
import AgentChangePassword from 'agent/features/auth/AgentChangePassword'
import AgentResetPassword from 'agent/features/auth/AgentResetPassword'
import CommissionTable from 'agent/features/commision'
import AgentCreatePin from 'agent/features/pin/AgentCreatePin'
import AgentResetPin from 'agent/features/pin/AgentResetPin'
import ShareholderDetailsScreen from 'agent/features/shareholder/ShareholderDetails'
import AddBankInfo from 'agent/features/wallet/withdrawal/AddBankInfo'
import { FC } from 'react'
import AgentMainTabNavigation from '../native/AgentMainTabNavigation'
import CommonBackHeader from './CommonBackHeader'

export type AgentStackParamList = {
  AgentMainTabNavigation: undefined
  AddBankInfo: undefined
  ShareholderDetails: undefined
  AgentDetails: undefined
  AgentResetPin: undefined
  AgentCommission: undefined
  AgentResetPassword: undefined
  AgentChangePassword: undefined
  AgentCreatePin: undefined
}

export interface AgentStackScreen {
  name: keyof AgentStackParamList
  component: FC
  options: StackNavigationOptions & {
    icon?: string
  }
}

export const AgentStackScreens: AgentStackScreen[] = [
  {
    name: 'AgentMainTabNavigation',
    component: AgentMainTabNavigation,
    options: {
      title: 'AgentMainTabNavigation',
      icon: 'AgentMainTabNavigation',
    },
  },
  {
    name: 'AddBankInfo',
    component: AddBankInfo,
    options: {
      title: 'wallet.addBank',
      icon: 'withdrawal',
    },
  },
  {
    name: 'ShareholderDetails',
    component: ShareholderDetailsScreen,
    options: {
      title: 'shAgent.shareholderDetails',
    },
  },
  {
    name: 'AgentDetails',
    component: AgentDetailsScreen,
    options: {
      title: 'shAgent.agentDetails',
    },
  },
  {
    name: 'AgentResetPin',
    component: AgentResetPin,
    options: {
      title: 'pin.resetPin',
    },
  },
  {
    name: 'AgentCommission',
    component: CommissionTable,
    options: {
      title: 'commission.title',
    },
  },
  {
    name: 'AgentResetPassword',
    component: AgentResetPassword,
    options: {
      title: 'menu.resetPass',
    },
  },
  {
    name: 'AgentChangePassword',
    component: AgentChangePassword,
    options: {
      title: 'menu.changePass',
    },
  },
  {
    name: 'AgentCreatePin',
    component: AgentCreatePin,
    options: {
      title: 'pin.createPin',
    },
  },
]
