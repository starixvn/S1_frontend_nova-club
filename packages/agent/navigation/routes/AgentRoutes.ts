import { AgentRoute } from '../NavigationType'

const _Routes: Readonly<AgentRoute[]> = [
  {
    route: '/agent/wallet/transfer',
    title: 'wallet.title',
    icon: 'withdrawal-transfer',
    key: 'Transfer',
  },
  {
    route: '/agent/member',
    title: 'member.title',
    icon: 'agent',
    key: 'MemberList',
  },
  {
    route: '/agent/report',
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
] as const

export type AgentRoutesParamList = Record<
  typeof _Routes[number]['key'],
  undefined | object
>

const AgentRoutes = _Routes

export default AgentRoutes
