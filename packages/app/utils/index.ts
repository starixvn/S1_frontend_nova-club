import { CURRENCY_SEPARATOR, CURRENCY_TO_LANGUAGE } from 'app/constant/currency'
import { LANGUAGE_CODE } from 'app/constant/language'
import * as Clipboard from 'expo-clipboard'
import { Currency } from './constant'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { store } from 'app/provider/redux/store'
import i18n from 'app/provider/localization/i18n'
/**
 * `expo-clipboard` version 2.1.1 is used due to v3 above need Expo SDK45
 * to support, and `setStringAsync` can't be used in IOS
 * https://github.com/expo/expo/issues/17548
 */
export async function copyToClipboard(
  message: string = '',
  onCopied?: (msg: string) => void
) {
  try {
    Clipboard.setString(message)
    onCopied && onCopied(message)

    Toast.show({
      type: 'info',
      text1: i18n.translate('common.copied', {
        locale: store.getState().setting.locale,
      }),
    })
  } catch (error) {
    console.error(error)
  }
}

export function toCurrency(
  amount: number | string,
  currency: Currency = Currency.VND,
  options?: {
    symbol?: boolean
    noDecimal?: boolean
    forceDecimal?: boolean
    skipThousandTruncate?: boolean
    hideTruncatedThousand?: boolean
    withSIPrefix?: boolean
    negative?: boolean
  }
): string {
  if (!amount) amount = 0.0
  if (typeof amount === 'string') amount = parseFloat(amount)
  const thousandSeperator = ','
  const decimalDeliminator = '.'
  const decimalLength = 3
  const currencySymbol = currency ?? ''
  let multiplier = ''

  options = options || {}
  const {
    symbol = currency != null,
    noDecimal = true,
    forceDecimal = false,
    skipThousandTruncate = true,
    hideTruncatedThousand = true,
    withSIPrefix = true,
    negative = false,
  } = options

  // contain multiplier
  if (isThousandCurrency(currency) && !skipThousandTruncate) {
    amount = toDisplayAmount(amount, currency)

    if (!hideTruncatedThousand) multiplier = " ('000)"
  }

  const parts = amount.toString().split('.')
  // parts[0] =
  //   parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeperator) || '0'

  let joined = parts[0]

  if (!noDecimal) {
    const decimalExist = parts.length > 1
    /**
     * WIP: Decimal here will remove `cent` in currency
     * For eg: 1125.78, that `78` cents will be removed
     */
    let decimals = decimalExist
      ? parts[1].toString().substring(0, decimalLength)
      : ''

    if (forceDecimal && decimals.length < decimalLength) {
      let decimalRepresentator = '1'
      decimalRepresentator = Math.pow(
        10,
        decimalLength - decimals.length
      ).toString()

      decimals = decimalRepresentator.replace('1', decimals)
      joined = `${parts[0]}${decimalDeliminator}${decimals}`
    } else {
      joined = decimalExist
        ? `${parts[0]}${decimalDeliminator}${decimals}`
        : parts[0]
    }
  }

  const language = CURRENCY_TO_LANGUAGE[currency]
  joined = appendWithThousandUnit(joined ?? '', language)

  if (multiplier) {
    joined += multiplier
  }
  if (negative) joined = `- ${joined}`
  return symbol ? `${currencySymbol} ${joined}` : joined
}

/**
 * @example
 * 1,000 = 1K
 * 10,000 = 10K
 */
export function appendWithThousandUnit(
  amount: string,
  language: LANGUAGE_CODE = LANGUAGE_CODE.ENGLISH
) {
  if (!amount) return amount

  let wholeNumber = amount
  const isContainDecimal = amount.includes('.')

  if (isContainDecimal) {
    const [wholeNum = '0'] = amount.split('.')
    wholeNumber = wholeNum
  }

  const parsedWholeNumber = Number(wholeNumber)
  const dividedResult = parsedWholeNumber / 1000
  const [quotient = '0', remainder = '0'] = dividedResult.toString().split('.')

  const MIN_AMOUNT = 100
  const formattedRemainder =
    parsedWholeNumber < MIN_AMOUNT ? '0' : remainder.substring(0, 1)

  if (quotient === '0' && formattedRemainder === '0') return '0'

  const formattedQuotient = toThousandSeparator(quotient, language)
  const formattedDecimal = toDecimalSeparator(formattedRemainder, language)

  return `${formattedQuotient}${formattedDecimal}K`
}

export function clearThousandSeparator(amount: string) {
  return amount.replace(/.(?=\d{3})/g, '')
}

const thousandCurrency = [Currency.VND]
export function isThousandCurrency(currency: Currency) {
  return thousandCurrency.includes(currency)
}

export function toDisplayAmount(
  real: string | number = 0,
  currency: Currency
): number {
  if (typeof real === 'string') real = parseFloat(real.replace(/\./g, ''))
  if (isThousandCurrency(currency)) {
    real = real / 1000
  }
  // return Math.floor(real);
  return real
}

export function toRealAmount(
  display: number | string,
  currency: Currency = Currency.VND
) {
  if (typeof display === 'string') display = parseFloat(display)
  if (isThousandCurrency(currency)) {
    display = display * 1000
  }

  return Math.floor(display)
}

export function toDecimalSeparator(
  text: string,
  language: LANGUAGE_CODE = LANGUAGE_CODE.VIETNAM
) {
  if (!text || text === '0') return ''

  const separatorSymbol = CURRENCY_SEPARATOR[language].decimal

  return `${separatorSymbol}${text}`
}

export function toThousandSeparator(
  text: string,
  language: LANGUAGE_CODE = LANGUAGE_CODE.VIETNAM
) {
  if (!text) return

  const separatorSymbol = CURRENCY_SEPARATOR[language].thousands
  const significants = text.toString().split('.')
  const wholeNum = parseFloat(significants[0] ?? '0')
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separatorSymbol)

  const decimal =
    significants.length > 1 ? significants[1]?.substring(0, 2) : undefined

  return `${wholeNum}${decimal ? '.' + decimal : ''}`
}

export interface CleanAmount {
  cleanText: string
  amountNumber: number
}

export function toCleanAmount(text: string): CleanAmount {
  let cleanText = text.replace(/[^0-9]/g, '')
  // if (cleanText === values.amount) return
  let amountNumber = parseFloat(cleanText)
  if (isNaN(amountNumber)) amountNumber = 0

  cleanText = toThousandSeparator(cleanText) ?? ''

  return { cleanText, amountNumber }
}
export function toCleanCard(text: string) {
  let cleanText = text
    .replace(/[^0-9]/g, '')
    .replace(/\s?/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()

  return cleanText
}

function nFormatter(num, digits = 1) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}

export const createFileName = (extension = '', ...names) => {
  if (!extension) return ''

  return `${names.join('')}.${extension}`
}

export function isBannedTrackingCode(tc?: string) {
  const bannerCode = ['guzmtvf72', 'wyza958413']
  return !tc ? false : bannerCode.includes(tc.toLowerCase())
}
