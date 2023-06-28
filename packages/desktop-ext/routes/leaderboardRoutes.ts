import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'LeaderboardEvent',
    title: 'Leaderboard Event',
    icon: 'star',
    route: '/account/leaderboard/event',
  },
  {
    key: 'Ranking',
    title: 'Ranking',
    icon: 'crown',
    route: '/account/leaderboard/ranking',
  },
  {
    key: 'LeaderboardHistory',
    title: 'Leaderboard History',
    icon: 'star',
    route: '/account/leaderboard/history',
  },
] as const

export type LeaderboardRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const LeaderboardRoutes = _Routes

export default LeaderboardRoutes
