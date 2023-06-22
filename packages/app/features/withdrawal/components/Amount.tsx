import useWithdrawalForm from 'app/features/withdrawal/hooks/useWithdrawalForm'
import React from 'react'

const Amount = () => {
  const { formik } = useWithdrawalForm()
  return (
    <MoneyInput
      label={t('common.amount')}
      placeholder={
        isCrypto
          ? t('validation.minMaxLimit', {
              min: toCurrency(minMax?.min ?? 0, currency, {
                symbol: false,
                forceDecimal: false,
              }),
              max: toCurrency(minMax?.max ?? 0, currency, {
                symbol: false,
                forceDecimal: false,
              }),
            })
          : t('placeholder.plsEnterFieldAmount', {
              field: t('menu.withdraw').toLowerCase(),
            })
      }
      keyboardType="number-pad"
      // setValue={handleChange('amount')}
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
              min: 1,
            })
          : undefined
      }
      onIconPress={handleMaxAmount}
    />
  )
}

export default Amount
