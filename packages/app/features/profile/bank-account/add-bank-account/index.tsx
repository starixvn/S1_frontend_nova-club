import React, { useEffect } from 'react'
import { TextField } from 'app/components/TextField'
import { styled, Text, View } from 'dripsy'
import { Button } from 'app/components/form/Button'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import { useDispatch } from 'react-redux'
import {
  useAddPlayerBankAccMutation,
  useWithdrawalBankQuery,
} from 'services/bank'
import { AlertActions } from 'app/store/alert'
import { useRouter } from 'solito/router'
import useLocalization from 'app/provider/localization'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { WithdrawalBankResult } from 'services/bank.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { toCleanCard } from 'app/utils'
import { MaxLength } from 'app/utils/constant'

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
  const { data: playerProfile } = usePlayerProfileQuery()

  const actionSheetId = t('bank.addBankAccount')

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
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  const formik = useFormik<AddBankAccountValues>({
    initialValues: {
      accountName: playerProfile?.data?.firstName ?? '',
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

  useEffect(() => {
    !!!values.accountName &&
      setValues({
        ...values,
        accountName: playerProfile?.data?.firstName ?? '',
      })
  }, [playerProfile])

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
            _flatList={{
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
