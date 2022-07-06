import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import { RootState } from 'app/provider/redux/store'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { Currency, currencyToIdListMapper } from 'app/utils/constant'
import { Text, View } from 'dripsy'
import { FormikFormProps, FormikHandlers, FormikProps } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { PlayerInputFieldsAmount } from 'services/deposit.type'
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
  const userInfo = useSelector((s: RootState) => s.auth.user)
  const currency = userInfo?.currency as Currency

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
                amount: values.amount,
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
