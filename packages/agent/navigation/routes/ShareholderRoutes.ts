import { AgentRoute } from '../NavigationType'

const _Routes: Readonly<AgentRoute[]> = [
  {
    route: '/agent/add/shareholder',
    base: '/agent/add',
    title: 'Add/Create',
    icon: 'add-agent',
    key: 'Add',
  },
  {
    route: '/agent/wallet/withdrawal',
    base: '/agent/wallet',
    title: 'wallet.title',
    icon: 'withdrawal-transfer',
    key: 'Wallet',
  },
  {
    route: '/agent/list/shareholder',
    base: '/agent/list',
    title: 'shAgent.title',
    icon: 'shareholder-agent',
    key: 'List',
  },
  {
    route: '/agent/report',
    title: 'report.title',
    icon: 'report',
    key: 'Report',
  },
] as const

export type ShareholderRoutesParamList = Record<
  typeof _Routes[number]['key'],
  undefined | object
>

const ShareholderRoutes = _Routes

export default ShareholderRoutes
