import { AgentRoute } from '../NavigationType'

const _Routes: Readonly<AgentRoute[]> = [
  {
    key: 'Commission',
    title: 'report.commission',
    route: '/agent/report/commission',
  },
  {
    key: 'Transaction',
    title: 'report.transaction',
    route: '/agent/report/transaction',
  },
] as const

export type ReportRoutesParamList = Record<
  typeof _Routes[number]['key'],
  undefined | object
>

const ReportRoutes = _Routes

export default ReportRoutes
