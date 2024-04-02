import IconButton from 'app/components/IconButton'
import MoneyInput from 'app/components/MoneyInput'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { FormikProps } from 'formik'
import React from 'react'
import { useGetAvailableWithdrawalAmountQuery } from 'services/withdrawal'
import { MinMax } from '../hooks/useCryptoSelection'
import { WithdrawalValues } from '../hooks/useWithdrawalForm'

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
    const value = toCurrency(Number(availableBalance?.balance), currency, {
      symbol: false,
      hideTruncatedThousand: false,
    })

    setValues({
      ...values,
      amount: value.slice(0, -1),
      realAmount: toRealAmount(value.replaceAll(',', '')),
    })
  }

  function onAmountChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text)
      setValues({
        ...values,
        amount: cleanText ? cleanText : '',
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

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
