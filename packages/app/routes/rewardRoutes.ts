import { Route } from 'app/navigation/type'

const _Routes = [
  {
    key: 'list', // assign key to match the routing's name
    title: 'rewards.redeem.title',
    shortTitle: 'rewards.scrollMenu.redeem',
    icon: 'coin-circle',
    base: '/rewards/redeem',
    route: '/rewards/redeem/list',
  },
  {
    key: 'how-to-earn',
    title: 'rewards.earn.title',
    shortTitle: 'rewards.scrollMenu.how',
    icon: 'tnc',
    base: '/rewards/redeem',
    route: '/rewards/redeem/how-to-earn',
  },
  {
    key: 'rules',
    title: 'rewards.rule.title',
    shortTitle: 'rewards.scrollMenu.rule',
    icon: 'notice',
    base: '/rewards/redeem',
    route: '/rewards/redeem/rules',
  },
  {
    key: 'history',
    title: 'common.history',
    shortTitle: 'common.history',
    icon: 'history',
    base: '/rewards/history',
    route: '/rewards/history',
  },
] as const satisfies Readonly<(Route & { shortTitle: string })[]>

export type RewardRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const rewardRoutes = _Routes

export default rewardRoutes
