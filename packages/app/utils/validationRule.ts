import * as Yup from 'yup'
import { clearThousandSeparator } from '.'
export default {
  amount: ({ min, max }: { min?: number; max?: number }) => {
    const minFloat = min ? parseFloat(min.toString().replace(/,/g, '')) : 0
    const maxFloat = max
      ? parseFloat(max.toString().replace(/,/g, ''))
      : 9999999999
    return Yup.string()
      .required('validation.amountLessThan')
      .test('min-max', `validation.amount`, (val) => {
        if (!val) return false
        const amountFloat = parseFloat(
          clearThousandSeparator(val).replace(/,/g, '')
        )

        return !(
          isNaN(amountFloat) ||
          !amountFloat ||
          amountFloat < minFloat ||
          amountFloat > maxFloat
        )
      })
  },
}
