import { AgentRoute } from '../NavigationType'

const _Routes: Readonly<AgentRoute[]> = [
  {
    route: '/agent/add/partner',
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
    route: '/agent/list/partner',
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
    route: '/agent/barcode',
    title: 'barcode.title',
    icon: 'qr-code',
    key: 'QR',
  },
  {
    route: '/agent/inbox/announcement',
    base: '/agent/inbox',
    title: 'menu.message',
    icon: 'mail',
    key: 'Inbox',
  },
] as const

export type PartnerRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const PartnerRoutes = _Routes

export default PartnerRoutes
