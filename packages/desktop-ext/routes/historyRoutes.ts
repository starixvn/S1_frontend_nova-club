import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'TransactionHistory',
    title: 'Transaction History',
    icon: 'lba',
    route: '/history',
  },
  {
    key: 'GameHistory',
    title: 'Game History',
    icon: 'cp',
    route: '/history',
  },
  {
    key: 'RedeemHistory',
    title: 'RedeemHistory',
    icon: 'cp',
    route: '/history',
  },
] as const

export type HistoryRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const HistoryRoutes = _Routes

export default HistoryRoutes
