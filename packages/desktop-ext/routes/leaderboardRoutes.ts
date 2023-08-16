import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  // {
  //   key: 'LeaderboardEvent',
  //   title: 'menu.tab.leaderboardEvent',
  //   icon: 'star',
  //   route: '/account/leaderboard/event',
  // },
  {
    key: 'Ranking',
    title: 'menu.tab.ranking',
    icon: 'crown',
    route: '/account/leaderboard/ranking',
  },
  // {
  //   key: 'LeaderboardHistory',
  //   title: 'menu.tab.leaderboardHistory',
  //   icon: 'star',
  //   route: '/account/leaderboard/history',
  // },
] as const

export type LeaderboardRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const LeaderboardRoutes = _Routes

export default LeaderboardRoutes
