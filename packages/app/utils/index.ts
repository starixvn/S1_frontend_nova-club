import { Currency, currencyListMapper } from './constant'
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
    noDecimal = false,
    forceDecimal = true,
    skipThousandTruncate = false,
    hideTruncatedThousand = true,
  } = options

  // contain multiplier
  if (isThousandCurrency(currency) && !skipThousandTruncate) {
    amount = toDisplayAmount(amount, currency)

    if (!hideTruncatedThousand) multiplier = " ('000)"
  }

  const parts = amount.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeperator)

  let joined = parts[0]

  if (!noDecimal) {
    const decimalExist = parts.length > 1
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

  if (multiplier) {
    joined += multiplier
  }
  return symbol ? `${currencySymbol} ${joined}` : joined
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

export interface CleanAmount {
  cleanText: string
  amountNumber: number
}

export function toCleanAmount(text: string): CleanAmount {
  const cleanText = text.replace(/[^0-9]/g, '')
  // if (cleanText === values.amount) return
  let amountNumber = parseFloat(cleanText)
  if (isNaN(amountNumber)) amountNumber = 0

  return { cleanText, amountNumber }
}
