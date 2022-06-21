import { Button } from 'app/components/form/Button'
import ButtonDemo from 'app/components/form/Button/ButtonDemo'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSubmitDepositMutation } from 'app/services/deposit'
import { BankItem } from 'app/services/dummyDeposit.type'
import { AlertActions } from 'app/store/alert'
import { copyToClipboard, toCleanAmount, toRealAmount } from 'app/utils'
import validation from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import DepositUpload from '../DepositUpload'
import * as Clipboard from 'expo-clipboard'

type LocalBankValues = {
  bank: BankItem
  amount: string
  realAmount: number
}

const LocalBankScreen = () => {
  const { t } = useLocalization()
  const dispatch = useDispatch()

  const [postSubmitDeposit] = useSubmitDepositMutation()
  const user = useAppSelector((state) => state.player.currentLoginUser)

  const depositBank = useAppSelector(
    (state) => state.bank.depositPayment?.manual[0].list
  )

  const onSubmit = async (
    { bank, realAmount }: LocalBankValues,
    actions: FormikHelpers<LocalBankValues>
  ) => {
    try {
      const { data, success, message } = await postSubmitDeposit({
        amount: realAmount,
        bank_type_id: bank.bankTypeId,
        card_code: 1111,
        card_seri: 2222,
        card_type: '1234',
        deposit_from: bank.deposit_from,
        username: user?.username ?? '',
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

  const formik = useFormik<LocalBankValues>({
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
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }
  const [copiedText, setCopiedText] = React.useState('')

  const copyToClipboard1 = () => {
    copyToClipboard(values.bank?.bank_acc_no)
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync()
    setCopiedText(text)
  }
  return (
    <PageWithBackHeader header={{ title: 'menu.deposit' }}>
      <View sx={{ flex: 1 }}>
        <Button onPress={copyToClipboard1}>
          <Button.Label>Click here to copy to Clipboard</Button.Label>
        </Button>
        <Button onPress={fetchCopiedText}>
          <Button.Label>View copied text</Button.Label>
        </Button>
        <Text>{copiedText}</Text>
        <TextField labelWidth={0}>
          <TextField.Select
            label=""
            _input={{
              placeholder: t('bank.selectBank'),
              value: values.bank?.bank_name_local,
            }}
            _flatList={{
              data: depositBank,
              // isLoading: isLoading || isFetching,
              selectedData: values.bank?.bank_name_local,
            }}
            _actionSheet={{
              headerTitle: 'bank.bank',
            }}
            onPress={(bank) => {
              setFieldValue('bank', bank)
            }}
          />
        </TextField>
        <TextField labelWidth={0.55}>
          <TextField.Label
            label="bank.accountName"
            value={values.bank?.bank_acc_name}
            sx={{ my: 0 }}
            copy
          />
          <TextField.Label
            label="bank.accountNumber"
            value={values.bank?.bank_acc_no}
            sx={{ my: 0 }}
            copy
          />
          <TextField.Label
            label="common.referenceId"
            value={values.bank?.pay_acc_id}
            sx={{ my: 0 }}
          />
          <TextField.TextInput
            label="deposit.depositAmount"
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
            containerStyle={{ mt: '$0', mb: '$4' }}
          />
        </TextField>

        <DepositUpload />

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
    </PageWithBackHeader>
  )
}

export default LocalBankScreen
