import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'TransactionHistory',
    title: 'menu.tab.transactionHistory',
    icon: 'lba',
    route: '/history/transaction',
  },
  {
    key: 'GameHistory',
    title: 'menu.tab.gameHistory',
    icon: 'cp',
    route: '/history/game',
  },
  {
    key: 'RedeemHistory',
    title: 'menu.tab.redeemHistory',
    icon: 'cp',
    route: '/history/redeem',
  },
] as const

export type HistoryRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const HistoryRoutes = _Routes

export default HistoryRoutes
