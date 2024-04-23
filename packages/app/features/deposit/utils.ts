import { toCleanAmount, toRealAmount } from 'app/utils'
import { FormikContextType } from 'formik'
import { Currency } from 'utils/constant'

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
