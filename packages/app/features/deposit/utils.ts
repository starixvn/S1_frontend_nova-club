import { toCleanAmount, toRealAmount } from 'app/utils'
import { FormikContextType } from 'formik'
import { Currency } from 'utils/constant'

/* Use this as s onAmountChanged */
/*
  This will allow input to be empty instead of always fallback to 0 , causing player unable to see the min/max placeholder
*/
export function onAmountChanged<T>(
  text: string,
  setFieldValue: FormikContextType<T>['setFieldValue'],
  currency: Currency
) {
  if (text != null && text.length > 0) {
    const { cleanText, amountNumber } = toCleanAmount(text)
    setFieldValue('amount', cleanText ? cleanText : '')
    setFieldValue('realAmount', toRealAmount(amountNumber, currency))
  } else {
    setFieldValue('amount', undefined)
    setFieldValue('realAmount', 0)
  }
}
