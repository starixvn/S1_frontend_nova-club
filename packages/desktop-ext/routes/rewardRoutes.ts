import { DesktopRoute } from './NavigationType'

const _Routes = [
  {
    key: 'list', // assign key to match the routing's name
    title: 'rewards.scrollMenu.redeem',
    icon: 'coin-circle',
    base: '/rewards/redeem',
    route: '/rewards/redeem/list',
  },
  // {
  //   key: 'how-to-earn',
  //   title: 'rewards.scrollMenu.how',
  //   icon: 'tnc',
  //   base: '/rewards/redeem',
  //   route: '/rewards/redeem/how-to-earn',
  // },
  {
    key: 'rules',
    title: 'rewards.scrollMenu.rule',
    icon: 'notice',
    base: '/rewards/redeem',
    route: '/rewards/redeem/rules',
  },
  {
    key: 'history',
    title: 'common.history',
    icon: 'history',
    altIcon: 'icon-history',
    base: '/rewards/history',
    route: '/rewards/history',
  },
] as const satisfies Readonly<DesktopRoute[]>

export type RewardRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const RewardRoutes = _Routes

export default RewardRoutes
