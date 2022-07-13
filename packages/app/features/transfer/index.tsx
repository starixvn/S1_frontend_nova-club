import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  usePlayerBalanceQuery,
  useTransferMemberToMemberMutation,
} from 'services/walletApi'
import { createParam } from 'solito'
import * as Yup from 'yup'

type TransferValues = {
  transferTo: string
  amount: string
  realAmount: number
}
const { useParam } = createParam<{ username: string }>()

const TransferScreen = () => {
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const [username] = useParam('username')

  const [postTransferMemberToMember] = useTransferMemberToMemberMutation()

  const { data } = usePlayerBalanceQuery()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const onSubmit = async (
    { transferTo, realAmount }: TransferValues,
    actions: FormikHelpers<TransferValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postTransferMemberToMember({
        amount: realAmount,
        to_username: transferTo,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<TransferValues>({
    initialValues: {
      amount: '',
      realAmount: 0,
      transferTo: username ?? '',
    },
    validationSchema: Yup.object({
      transferTo: validation.transferTo,
      amount: validation.amount,
    }),
    onSubmit,
  })
  const {
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
    isValid,
    dirty,
    submitForm,
    setValues,
  } = formik

  useEffect(() => {
    username &&
      !!!values.transferTo &&
      setValues({ ...values, transferTo: username })
  }, [username])

  function onAmountChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text)
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

  return (
    <PageWithBackHeader header={{ title: 'Transfer' }}>
      <View sx={{ flex: 1 }}>
        <View
          sx={{
            p: '$4',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>{t('transfer.avaiableAmount')}:</Text>
          <Text>
            {toCurrency(Number(data?.data?.main.balance), currency, {
              symbol: false,
              hideTruncatedThousand: false,
            })}
          </Text>
        </View>
        <TextField labelWidth={0.7}>
          <TextField.Label
            label="transfer.transferTo"
            value={values.transferTo ?? ''}
            sx={{ my: 0 }}
          />
          <TextField.TextInput
            label="common.amount"
            isAmount
            _input={{
              placeholder: t('common.enterAmount', {
                field: t('transfer.transfer').toLowerCase(),
              }),
              value: values.amount,
              keyboardType: 'number-pad',
              onChangeText: onAmountChanged,
              onBlur: handleBlur('amount'),
            }}
            error={touched.amount && errors.amount ? errors.amount : undefined}
            containerStyle={{ mt: '$0', mb: '$4' }}
          />
        </TextField>

        <Button
          rounded
          stretch
          loading={isSubmitting}
          disabled={!isValid || !dirty}
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          containerStyle={{
            m: '$10',
          }}
          onPress={submitForm}
        >
          <Button.Label>{t('transfer.transfer')}</Button.Label>
        </Button>
      </View>
    </PageWithBackHeader>
  )
}

export default TransferScreen
