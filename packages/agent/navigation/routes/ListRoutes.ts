const _Routes = [
  {
    key: 'ListShareholder',
    title: 'common.shareholder',
    icon: 'shareholder',
    route: '/agent/list/shareholder',
  },
  {
    key: 'ListAgent',
    title: 'common.agent',
    icon: 'agent',
    route: '/agent/list/agent',
  },
] as const

export type ListRoutesParamList = Record<
  typeof _Routes[number]['key'],
  undefined | object
>

const ListRoutes = _Routes

export default ListRoutes
