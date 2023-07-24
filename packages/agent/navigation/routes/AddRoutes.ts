const AddRoutes = [
  {
    key: 'AddShareholder',
    title: 'common.shareholder',
    icon: 'add-agent',
    route: '/agent/add/shareholder',
  },
  {
    key: 'AddAgent',
    title: 'common.agent',
    icon: 'add-agent',
    route: '/agent/add/agent',
  },
] as const

export type AddRoutesParamList = Record<
  typeof AddRoutes[number]['key'],
  undefined | object
>

export default AddRoutes
