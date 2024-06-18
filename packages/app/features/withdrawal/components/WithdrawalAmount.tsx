import IconButton from 'app/components/IconButton'
import MoneyInput from 'app/components/MoneyInput'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import {
  isThousandCurrency,
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
  toThousandSeparator,
} from 'app/utils'
import { FormikProps } from 'formik'
import React, { useMemo } from 'react'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'
import { MinMax } from '../hooks/useCryptoSelection'
import { WithdrawalValues } from '../hooks/useWithdrawalForm'
import { Currency } from 'utils/constant'

type WithdrawalAmountProps = {
  isCrypto?: boolean
  formik: FormikProps<WithdrawalValues>
} & MinMax

const WithdrawalAmount = ({
  isCrypto = false,
  formik,
  minMax,
}: WithdrawalAmountProps) => {
  const { t } = useLocalization()
  const currency = useAppSelector((state) => state.setting.currency)

  const { data: availableBalance } = useGetAvailableWithdrawalAmountQuery()

  const { values, handleChange, handleBlur, touched, errors, setValues } =
    formik

  const handleMaxAmount = () => {
    if (availableBalance?.balance) {
      const realAmount = Math.trunc(Number(availableBalance?.balance))

      setValues({
        ...values,
        amount: toThousandSeparator(
          Math.trunc(toDisplayAmount(realAmount, currency)).toString()
        ),
        realAmount,
      })
    }
  }

  function onAmountChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text)

      setValues({
        ...values,
        amount: cleanText ? cleanText : '',
        realAmount: toRealAmount(amountNumber, currency),
      })
    }
  }

  const isShowingK = useMemo(() => isThousandCurrency(currency), [currency])

  return (
    <MoneyInput
      label={t('common.amount')}
      placeholder={t('validation.minMaxLimit', {
        min: toCurrency(minMax?.min ?? 0, currency, {
          symbol: false,
          forceDecimal: false,
        }),
        max: toCurrency(minMax?.max ?? 0, currency, {
          symbol: false,
          forceDecimal: false,
        }),
      })}
      isThousandCurrency={isShowingK}
      keyboardType="number-pad"
      onChangeText={onAmountChanged}
      onBlur={handleBlur('amount')}
      value={values.amount}
      error={
        touched.amount && errors.amount
          ? t(errors.amount, {
              field: t('common.amount'),
              amount: toCurrency(values.realAmount ?? 1, currency, {
                forceDecimal: false,
                symbol: false,
              }),
              min: minMax?.min,
            })
          : undefined
      }
      actions={
        <IconButton
          name="cash"
          size={18}
          color={'$secondary.100'}
          onPress={handleMaxAmount}
        />
      }
    />
  )
}

export default WithdrawalAmount
