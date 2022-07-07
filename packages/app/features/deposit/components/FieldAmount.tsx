import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import {
  clearThousandSeparator,
  toCleanAmount,
  toCurrency,
  toRealAmount,
} from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Text, View } from 'dripsy'
import { FormikProps } from 'formik'
import React from 'react'
import { PlayerInputFieldsAmount } from 'services/deposit.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { AutoDepositValues } from './AutoDepositForm'

type FieldAmountProps = {
  field: PlayerInputFieldsAmount
  minAmount: string
  maxAmount: string
  formik: FormikProps<AutoDepositValues>
}

const FieldAmount = ({
  field,
  minAmount,
  maxAmount,
  formik,
}: FieldAmountProps) => {
  const { t } = useLocalization()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

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
    <View>
      <Text sx={{ mx: '$4', mt: '$4' }}>{field?.label_lang}</Text>
      <TextField.TextInput
        label=""
        isAmount
        _input={{
          placeholder: t('validation.minMaxLimit', {
            min: toCurrency(minAmount ?? 0, currency, {
              symbol: false,
              forceDecimal: false,
            }),
            max: toCurrency(maxAmount ?? 0, currency, {
              symbol: false,
              forceDecimal: false,
            }),
          }),
          value: values.amount,
          keyboardType: 'number-pad',
          onChangeText: onAmountChanged,
          onBlur: handleBlur('amount'),
        }}
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
        containerStyle={{ my: '$3' }}
      />
    </View>
  ) : null
}

export default FieldAmount
