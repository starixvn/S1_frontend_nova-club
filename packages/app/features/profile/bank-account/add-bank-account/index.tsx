import React from 'react'
import { TextField } from 'app/components/TextField'
import { styled, View } from 'dripsy'
import { Button } from 'app/components/form/Button'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAddPlayerBankAccMutation,
  useWithdrawalBankQuery,
} from 'services/bank'
import { AlertActions } from 'app/store/alert'
import { useRouter } from 'solito/router'
import useLocalization from 'app/provider/localization'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { WithdrawalBankResult } from 'services/bank.type'
import { toCleanCard } from 'app/utils'
import { MaxLength } from 'app/utils/constant'
import { RootState } from 'app/provider/redux/store'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'

const actionSheetId = ACTION_SHEET_ID.ADD_BANK_ACCOUNT

type AddBankAccountValues = {
  accountName: string
  bank: WithdrawalBankResult | undefined
  accountNo: string
}

const AddBankAccountScreen = () => {
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { back } = useRouter()
  const { data, isLoading, isFetching, isSuccess } = useWithdrawalBankQuery()
  const [postAddWithdrawalBankAcc] = useAddPlayerBankAccMutation()

  const player = useSelector((s: RootState) => s.auth.info)

  const onSubmit = async (
    { accountName, bank, accountNo }: AddBankAccountValues,
    actions: FormikHelpers<AddBankAccountValues>
  ) => {
    try {
      const { data, success, message } = await postAddWithdrawalBankAcc({
        bank_acc_name: bank?.bank_name ?? '',
        bank_acc_num: accountNo,
        bank_address: 'bankAcc',
        bank_type_id: bank?.id ?? 0,
        branch: bank?.bank_code ?? '',
        city: 'bankAcc',
        province: 'bankAcc',
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()

        back()
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
    }
  }

  const formik = useFormik<AddBankAccountValues>({
    initialValues: {
      accountName: player?.playerName ?? '',
      bank: undefined,
      accountNo: '',
    },
    validationSchema: Yup.object({
      accountName: validation.accountName,
      bank: validation.bank,
      accountNo: validation.accountNo,
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
    setFieldValue,
    setValues,
  } = formik

  function onCardChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanCard(text)
      setValues({
        ...values,
        accountNo: cleanText,
      })
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addBankAccount') }}>
      <StyledView>
        <TextField labelWidth={0.55}>
          <TextField.TextInput
            label="bank.accountName"
            _input={{
              placeholder: 'bank.enterAccountName',
              editable: values.accountName === '' ? true : false,
              value: values.accountName,
            }}
            error={
              touched.accountName && errors.accountName
                ? errors.accountName
                : undefined
            }
            containerStyle={{ my: '$3' }}
          />
          <TextField.Select
            label="bank.bank"
            _input={{
              placeholder: t('bank.selectBank'),
              value: values.bank?.bank_name ?? '',
            }}
            _dataList={{
              data: data,
              isLoading: isLoading || isFetching,
              key: 'id',
              titleType: 'bank_code',
              onPress: (item) => setFieldValue('bank', item),
            }}
            _actionSheet={{
              id: actionSheetId,
              headerTitle: t('bank.bank'),
            }}
          />

          <TextField.TextInput
            label="bank.accountNo"
            _input={{
              placeholder: t('bank.enterAccountNo'),
              value: values.accountNo,
              onChangeText: onCardChanged,
              onBlur: handleBlur('accountNo'),
              keyboardType: 'number-pad',
              maxLength: MaxLength.CARD,
            }}
            error={
              touched.accountNo && errors.accountNo
                ? errors.accountNo
                : undefined
            }
            containerStyle={{ my: '$0' }}
          />
        </TextField>

        <StyledButtonWrapper>
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
            onPress={submitForm}
          >
            <Button.Label>Next</Button.Label>
          </Button>
        </StyledButtonWrapper>
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$6',
}))

const StyledButtonWrapper = styled(View)(() => ({
  my: '$10',
  mx: '$6',
}))
export default AddBankAccountScreen
