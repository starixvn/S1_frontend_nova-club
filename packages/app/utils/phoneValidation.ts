import { COUNTRY_CODE } from 'app/constant/country'

const validationRegex = {
  [COUNTRY_CODE.Vietnam]: /(84|0[3|5|7|8|9])+([0-9]{8})$/,
}

const phonePrefix = {
  [COUNTRY_CODE.Vietnam]: '84',
}

export type CountryCodeType = keyof typeof validationRegex

export function isValidPhoneNum(
  phoneNum: string | undefined,
  countryCode: CountryCodeType
): boolean {
  if (!countryCode) {
    throw new Error('Custom message: Country code is required')
  }

  if (!phoneNum) return false

  return validationRegex[countryCode].test(phonePrefix[countryCode] + phoneNum)
}
