import { MOBILE_PREFIX } from 'app/constants/country'
import { Currency, LANGUAGE_CODE } from 'utils/constant'

export const CURRENCY_LANGUAGE_LIST = [
  {
    title: 'Vietnam',
    currency: Currency.VND,
    localeLang: LANGUAGE_CODE.VIETNAM,
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
  {
    title: 'Thailand',
    currency: Currency.THB,
    localeLang: LANGUAGE_CODE.THAILAND,
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
]

export const CURRENCY_SELECTION = [
  { label: 'VND', value: Currency.VND },
  { label: 'THB', value: Currency.THB },
]

export const MOBILE_PREFIX_BY_CURRENCY = {
  [Currency.VND]: MOBILE_PREFIX.VND,
  [Currency.THB]: MOBILE_PREFIX.THB,
}

export const CURRENCY_TO_LANGUAGE: Record<
  keyof typeof Currency,
  LANGUAGE_CODE
> = {
  [Currency.VND]: LANGUAGE_CODE.VIETNAM,
  [Currency.THB]: LANGUAGE_CODE.THAILAND,
}

type CurrencyMatchableLanguage = Exclude<LANGUAGE_CODE, LANGUAGE_CODE.ENGLISH>
export const LANGUAGE_TO_CURRENCY: Record<CurrencyMatchableLanguage, Currency> =
  {
    [LANGUAGE_CODE.VIETNAM]: Currency.VND,
    [LANGUAGE_CODE.THAILAND]: Currency.THB,
  }

export const CURRENCY_WITH_THOUSAND_FORMAT = [Currency.VND]

export const CURRENCY_SEPARATOR = {
  [LANGUAGE_CODE.ENGLISH]: {
    decimal: '.',
    thousands: ',',
  },
  [LANGUAGE_CODE.VIETNAM]: {
    decimal: '.',
    thousands: ',',
  },
  [LANGUAGE_CODE.THAILAND]: {
    decimal: '.',
    thousands: ',',
  },
}
