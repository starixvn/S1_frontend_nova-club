export enum AGENT_LANGUAGE_CODE {
  VIETNAM = 'vn',
}

export enum Currency {
  THB = 'THB',
  VND = 'VND',
}

export enum MOBILE_PREFIX {
  VND = '84',
  THB = '66',
}

export const CURRENCY_SELECTION = [
  { label: 'VND', value: Currency.VND },
  { label: 'THB', value: Currency.THB },
]

export const MOBILE_PREFIX_BY_CURRENCY = {
  [Currency.VND]: MOBILE_PREFIX.VND,
  [Currency.THB]: MOBILE_PREFIX.THB,
}
