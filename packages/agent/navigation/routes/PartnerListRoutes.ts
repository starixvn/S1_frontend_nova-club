const _Routes = [
  {
    key: 'ListPartner',
    title: 'common.shareholder_agent',
    icon: 'shareholder',
    route: '/agent/list/partner',
  },
  {
    key: 'ListMember',
    title: 'common.member',
    icon: 'agent',
    route: '/agent/list/member',
  },
] as const

export type PartnerListRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const PartnerListRoutes = _Routes

export default PartnerListRoutes
