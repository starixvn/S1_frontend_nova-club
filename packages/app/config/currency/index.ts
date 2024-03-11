import { MOBILE_PREFIX } from 'app/constants/country'
import { Currency, LANGUAGE_CODE } from 'utils/constant'

export const CURRENCY_LANGUAGE_LIST = [
  {
    title: 'Thailand',
    currency: Currency.THB,
    image: require('app/assets/images/common/th.jpg'),
    language: [
      {
        label: 'English',
        value: LANGUAGE_CODE.ENGLISH,
      },
      {
        label: 'ไทย',
        value: LANGUAGE_CODE.THAILAND,
      },
    ],
  },
  {
    title: 'Vietnam',
    currency: Currency.VND,
    image: require('app/assets/images/common/vn.jpg'),
    language: [
      {
        label: 'English',
        value: LANGUAGE_CODE.ENGLISH,
      },
      {
        label: 'Tiếng Việt',
        value: LANGUAGE_CODE.VIETNAM,
      },
    ],
  },
]

export const CURRENCY_SELECTION = [
  { label: 'VND', value: Currency.VND },
  { label: 'THB', value: Currency.THB },
]

export const MOBILE_PREFIX_BY_CURRENCY = {
  [Currency.VND]: MOBILE_PREFIX.VND,
  [Currency.THB]: MOBILE_PREFIX.THB,
}
