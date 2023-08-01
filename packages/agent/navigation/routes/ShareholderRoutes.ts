import { AgentRoute } from '../NavigationType'

const _Routes: Readonly<AgentRoute[]> = [
  {
    route: '/agent/add/shareholder',
    base: '/agent/add',
    title: 'shAgent.add',
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
    route: '/agent/report/commission',
    base: '/agent/report',
    title: 'report.title',
    icon: 'report',
    key: 'Report',
  },
  {
    route: '/agent/inbox/announcement',
    base: '/agent/inbox',
    title: 'menu.message',
    icon: 'mail',
    key: 'Inbox',
  },
] as const

export type ShareholderRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const ShareholderRoutes = _Routes

export default ShareholderRoutes
