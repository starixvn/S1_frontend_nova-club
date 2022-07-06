import {
  Currency,
  currencyListMapper,
  LANGUAGE_SUBTAG,
  LANGUAGE_CODE,
} from './constant'
import * as Clipboard from 'expo-clipboard'
import { number } from 'yup'

/**
 * `expo-clipboard` version 2.1.1 is used due to v3 above need Expo SDK45
 * to support, and `setStringAsync` can't be used in IOS
 * https://github.com/expo/expo/issues/17548
 */
export async function copyToClipboard(
  message: string,
  onCopied?: (msg: string) => void
) {
  try {
    Clipboard.setString(message)
    onCopied && onCopied(message)
    // SimpleToast.show(t('common.copied', { message }), SimpleToast.SHORT);
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

  joined = appendWithThousandUnit(joined ?? '')

  if (multiplier) {
    joined += multiplier
  }
  return symbol ? `${currencySymbol} ${joined}` : joined
}

/**
 * @example
 * 1,000 = 1K
 * 10,000 = 10K
 */
export function appendWithThousandUnit(
  amount: string,
  language: LANGUAGE_CODE = LANGUAGE_CODE.VIETNAM
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

  const concatAmount = quotient + `.${formattedRemainder}`
  const locale = LANGUAGE_SUBTAG[language]
  const formattedAmount = Intl.NumberFormat(locale).format(Number(concatAmount))

  return `${formattedAmount}K`
}

const thousandCurrency = [Currency.VND]
export function isThousandCurrency(currency: Currency) {
  return thousandCurrency.includes(currency)
}

export function toDisplayAmount(
  real: string | number = 0,
  currency: Currency
): number {
  if (typeof real === 'string') real = parseFloat(real)
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

export function toThousandSeparator(text: string) {
  if (!text) return
  // return text.replace(/^0+(?!\.|$)/, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return parseFloat(text)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export interface CleanAmount {
  cleanText: string
  amountNumber: number
}

export function toCleanAmount(text: string): CleanAmount {
  let cleanText = text.replace(/[^0-9]/g, '')
  cleanText = toThousandSeparator(cleanText) ?? ''
  // if (cleanText === values.amount) return
  let amountNumber = parseFloat(cleanText)
  if (isNaN(amountNumber)) amountNumber = 0

  return { cleanText, amountNumber }
}
export function toCleanCard(text: string): CleanAmount {
  let cleanText = text.replace(/[^0-9]/g, '')
  // cleanText = toThousandSeparator(cleanText) ?? ''
  // if (cleanText === values.amount) return
  let amountNumber = parseFloat(cleanText)
  if (isNaN(amountNumber)) amountNumber = 0

  return { cleanText, amountNumber }
}
