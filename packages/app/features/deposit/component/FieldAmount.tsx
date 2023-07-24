import useLocalization from 'app/provider/localization'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { FormikProps } from 'formik'
import React from 'react'
import { PlayerInputFieldsAmount } from 'services/deposit.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { DepositValues } from './DepositForm'
import Input from 'app/components/form/Input'
import { Text } from 'dripsy'

type FieldAmountProps = {
  field: PlayerInputFieldsAmount
  minAmount: string
  maxAmount: string
  formik: FormikProps<DepositValues>
}

const FieldAmount = ({
  field,
  minAmount,
  maxAmount,
  formik,
}: FieldAmountProps) => {
  const { t } = useLocalization()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  const { handleBlur, values, errors, touched, setValues } = formik

  function onAmountChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text)
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber, currency),
      })
    }
  }

  return field ? (
    <>
      <Input
        label={t('common.amount')}
        placeholder={t('validation.minMaxLimit', {
          min: toCurrency(minAmount ?? 0, currency, {
            symbol: false,
            forceDecimal: false,
          }),
          max: toCurrency(maxAmount ?? 0, currency, {
            symbol: false,
            forceDecimal: false,
          }),
        })}
        keyboardType={'number-pad'}
        onChangeText={onAmountChanged}
        onBlur={handleBlur('amount')}
        sx={{ mt: '$2' }}
        value={values.amount}
        action={() => (
          <>
            <Text sx={{ color: '$secondary.100' }}>
              = {values.amount ? values.amount : 0}K
            </Text>
          </>
        )}
        error={
          touched.amount && errors.amount
            ? t(errors.amount, {
                field: t('common.amount'),
                amount: toCurrency(values.realAmount ?? 0, currency, {
                  forceDecimal: false,
                  symbol: false,
                }),
                min: toCurrency(minAmount ?? 0, currency, {
                  forceDecimal: false,
                  symbol: false,
                }),
              })
            : undefined
        }
      />
    </>
  ) : null
}

export default FieldAmount
