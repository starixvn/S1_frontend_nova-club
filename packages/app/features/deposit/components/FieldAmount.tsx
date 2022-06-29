import { TextField } from 'app/components/TextField'
import { toCleanAmount, toRealAmount } from 'app/utils'
import { Text, View } from 'dripsy'
import { FormikFormProps, FormikHandlers, FormikProps } from 'formik'
import React from 'react'
import { PlayerInputFieldsAmount } from 'services/deposit.type'
import { AutoDepositValues } from '../online-bank'

type FieldAmountProps = {
  field: PlayerInputFieldsAmount
  formik: FormikProps<AutoDepositValues>
}

const FieldAmount = ({ field, formik }: FieldAmountProps) => {
  const { handleBlur, values, errors, touched, setValues } = formik

  function onAmountChanged(text: string) {
    console.log('text', text)
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text)
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

  return field ? (
    <View>
      <Text sx={{ mx: '$4', mt: '$4' }}>{field?.label_lang}</Text>
      <TextField.TextInput
        label=""
        _input={{
          placeholder: values.paymentGateway
            ? `${values.paymentGateway?.minDeposit} - ${values.paymentGateway?.maxDeposit}`
            : '0',
          value: values.amount,
          keyboardType: 'number-pad',
          onChangeText: onAmountChanged,
          onBlur: handleBlur('amount'),
        }}
        error={touched.amount && errors.amount ? errors.amount : undefined}
        containerStyle={{ my: '$3' }}
      />
    </View>
  ) : null
}

export default FieldAmount
