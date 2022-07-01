import { Button } from 'app/components/form/Button'
import Select from 'app/components/form/Select'
import { TextField } from 'app/components/TextField'
import { useAppSelector } from 'app/provider/redux/store'
import { styled, Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import ImportantNotice from 'app/components/ImportantNotice'
import SquareSelectorActionSheet, {
  DEFAULT_SQUARE_ACTION_SHEET_ID,
} from 'app/components/actionsheet/SquareSelectorActionSheet'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert'
import { useRouter } from 'solito/router'
import { useSubmitWithdrawalMutation } from 'services/withdrawal'
import { toRealAmount } from 'app/utils'
import { usePlayerBankQuery } from 'services/bank'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import RoundedIcon from 'app/components/RoundedIcon'
import { SheetManager } from 'react-native-actions-sheet'
import BankItem from 'app/components/actionsheet/BankItem'
import { PlayerBankResult } from 'services/bank.type'

type WithdrawalValues = {
  amount: string
  realAmount: number
  bank: PlayerBankResult | undefined
}

const NOTES = ['note.w1', 'note.w2', 'note.w3', 'note.w4', 'note.w5']

const WithdrawalPage = () => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { replace } = useRouter()
  const { data, isLoading, isFetching, isSuccess } = usePlayerBankQuery()
  const [postSubmitWithdrawal] = useSubmitWithdrawalMutation()
  const [convertedData, setConvertedData] = useState([])
  const [selectedBank, setSelectedBank] = useState()

  const actionSheetId = t('menu.withdraw')

  const onSubmit = async (
    { bank, realAmount }: WithdrawalValues,
    actions: FormikHelpers<WithdrawalValues>
  ) => {
    try {
      const { data, success, message } = await postSubmitWithdrawal({
        amount: realAmount,
        bank_acc_name: bank?.BankAccountFullName ?? '',
        bank_acc_num: bank?.BankAccountNumber ?? '',
        bank_details_id: bank?.PlayerBankDetailsId ?? 0,
        bank_type_id: bank?.BankTypeId ?? 0,
        crypto_address: '112233',
        crypto_protocol: '112233',
        exchange_rate: 1,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()

        replace('/profile')
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  const formik = useFormik<WithdrawalValues>({
    initialValues: {
      amount: '',
      realAmount: 0,
      bank: undefined,
    },
    validationSchema: Yup.object({
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
    setFieldValue,
  } = formik

  function onAmountChanged(text: string) {
    if (text != null) {
      const cleanText = text.replace(/[^0-9]/g, '')
      if (cleanText === values.amount) return
      let amountNumber = parseFloat(cleanText)
      if (isNaN(amountNumber)) amountNumber = 0
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.withdraw') }}>
      <StyledView>
        <TextField labelWidth={0.55}>
          <TextField.Select
            label="bank.bank"
            _input={{
              placeholder: t('bank.selectBank'),
              value: values.bank?.BankAccountFullName,
            }}
            _flatList={{
              data: data,
              isLoading: isLoading || isFetching,
              titleType: 'BankCode',
              onPress: (item) => setFieldValue('bank', item),
            }}
            _actionSheet={{
              id: actionSheetId,
              headerTitle: t('bank.bank'),
            }}
          />

          <TextField.TextInput
            label="common.amount"
            _input={{
              placeholder: t('common.enterAmount'),
              value: values.amount.toString(),
              keyboardType: 'number-pad',
              onChangeText: onAmountChanged,
              onBlur: handleBlur('amount'),
            }}
            error={touched.amount && errors.amount ? errors.amount : undefined}
            containerStyle={{ my: '$3' }}
          />

          <ImportantNotice keys={NOTES} module="withdrawal" />

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
            sx={{
              my: '$10',
            }}
            onPress={submitForm}
          >
            <Button.Label>Next</Button.Label>
          </Button>
        </TextField>
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
}))

export default WithdrawalPage
