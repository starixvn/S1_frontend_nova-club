import { Button } from 'app/components/form/Button'
import ImportantNotice from 'app/components/ImportantNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSubmitDepositMutation } from 'services/deposit'
import {
  BankItem,
  DepositPaymentCategoriesResult,
} from 'services/dummyDeposit.type'
import { AlertActions } from 'app/store/alert'
import { toCleanAmount, toRealAmount } from 'app/utils'
import validation from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { DepositMethodId } from '..'

const NOTES = ['note.d1', 'note.d2', 'note.d3', 'note.d4']
type OnlineBankValues = {
  bank: BankItem
  amount: string
  realAmount: number
}
const OnlineBankScreen = () => {
  const { t } = useLocalization()
  const dispatch = useDispatch()

  const [postSubmitDeposit] = useSubmitDepositMutation()
  const depositBank = useAppSelector((state) =>
    state.bank.depositPayment.find(
      (el) => el.id === DepositMethodId.ONLINE_BANK
    )
  )
  console.log(
    '🚀 ~ file: index.tsx ~ line 36 ~ OnlineBankScreen ~ depositBank',
    depositBank
  )

  const onSubmit = async (
    { bank, realAmount }: OnlineBankValues,
    actions: FormikHelpers<OnlineBankValues>
  ) => {
    try {
      const { data, success, message } = await postSubmitDeposit({
        amount: realAmount,
        bank_type_id: bank.bankTypeId,
        card_code: 1111,
        card_seri: 2222,
        card_type: '1234',
        deposit_from: bank.deposit_from,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  const formik = useFormik<OnlineBankValues>({
    initialValues: {
      bank: null,
      amount: '',
      realAmount: 0,
    },
    validationSchema: Yup.object({
      realAmount: validation.amount,
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
    setFieldValue,
  } = formik

  function onAmountChanged(text: string) {
    console.log('text', text)
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text)
      // const cleanText = text.replace(/[^0-9]/g, '')
      // if (cleanText === values.amount) return
      // let amountNumber = parseFloat(cleanText)
      // if (isNaN(amountNumber)) amountNumber = 0
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.deposit') }}>
      <View sx={{ flex: 1 }}>
        <TextField labelWidth={0}>
          <TextField.Select
            label=""
            _input={{
              placeholder: t('bank.selectBank'),
              value: values.bank?.bank_name_local,
            }}
            _flatList={{
              data: depositBank?.list,
              // isLoading: isLoading || isFetching,
              selectedData: values.bank?.bank_name_local,
              keyExtractor: (item) => values.bank?.bankTypeId,
            }}
            _actionSheet={{
              headerTitle: 'bank.bank',
            }}
            onPress={(bank) => {
              setFieldValue('bank', bank)
            }}
          />
          <Text sx={{ mx: '$4', mt: '$4' }}>{t('deposit.depositAmount')}</Text>
          <TextField.TextInput
            label=""
            _input={{
              placeholder: values.bank
                ? `${values.bank?.minDeposit} - ${values.bank?.maxDeposit}`
                : '0',
              value: values.amount,
              keyboardType: 'number-pad',
              onChangeText: onAmountChanged,
              onBlur: handleBlur('amount'),
            }}
            error={touched.amount && errors.amount ? errors.amount : undefined}
            containerStyle={{ my: '$3' }}
          />
        </TextField>

        <View sx={{ flex: 1, m: '$4', justifyContent: 'space-between' }}>
          <ImportantNotice keys={NOTES} module="deposit" />

          <Button
            rounded
            stretch
            disabled={!isValid || !dirty}
            variant="lg"
            fill={{
              type: 'gradient',
              color: 'secondary',
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            }}
            containerStyle={{
              my: '$10',
            }}
            onPress={submitForm}
          >
            <Button.Label>{t('common.next')}</Button.Label>
          </Button>
        </View>
      </View>
    </PageWithBackHeader>
  )
}

export default OnlineBankScreen
