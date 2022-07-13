import { LANGUAGE_CODE } from 'app/constant/language'
import { Currency } from 'app/utils/constant'

export const CURRENCY_TO_LANGUAGE = {
  [Currency.VND]: LANGUAGE_CODE.VIETNAM,
}

export const CURRENCY_SEPARATOR = {
  [LANGUAGE_CODE.ENGLISH]: {
    decimal: '.',
    thousands: ',',
  },
  [LANGUAGE_CODE.VIETNAM]: {
    decimal: ',',
    thousands: '.',
  },
}
