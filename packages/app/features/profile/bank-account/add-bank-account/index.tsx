import React, { createRef, useReducer, useRef, useState } from 'react'
import { TextField } from 'app/components/TextField'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  styled,
  Text,
  View,
} from 'dripsy'
import { Button } from 'app/components/form/Button'
import { useAppSelector } from 'app/provider/redux/store'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import Select from 'app/components/form/Select'
import { useDispatch } from 'react-redux'
import BankSelectorActionSheet from 'app/components/BankSelectorActionSheet'
import { Dimensions, TouchableOpacity } from 'react-native'
import {
  useAddPlayerBankAccMutation,
  useWithdrawalBankQuery,
} from 'app/services/bank'
import { AlertActions } from 'app/store/alert'
import { useRoute } from '@react-navigation/native'
import { useRouter } from 'solito/router'
import useLocalization from 'app/provider/localization'
import { PageWithBackHeader } from 'app/components/layout/Page'
import ActionSheet from 'react-native-actions-sheet'
import { WithdrawalBankResult } from 'app/services/bank.type'

type AddBankAccountValues = {
  accountName: string
  bank: WithdrawalBankResult | {}
  accountNo: string
}

const AddBankAccountScreen = () => {
  const dispatch = useDispatch()
  const actionSheetRef = createRef()
  const { t } = useLocalization()
  const { back } = useRouter()
  const user = useAppSelector((state) => state.player.currentLoginUser)
  const { data, isLoading, isFetching, isSuccess } = useWithdrawalBankQuery({
    username: user?.username ?? '',
  })
  const [postAddWithdrawalBankAcc] = useAddPlayerBankAccMutation()

  const onSubmit = async (
    { accountName, bank, accountNo }: AddBankAccountValues,
    actions: FormikHelpers<AddBankAccountValues>
  ) => {
    try {
      const { data, success, message } = await postAddWithdrawalBankAcc({
        bank_acc_name: 'bankAcc',
        bank_acc_num: accountNo,
        bank_address: 'bankAcc',
        bank_type_id: bank.id,
        branch: 'bankAcc',
        city: 'bankAcc',
        province: 'bankAcc',
        username: user?.username ?? '',
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))
      console.log(
        '🚀 ~ file: index.tsx ~ line 64 ~ WithdrawalPage ~ data',
        data
      )

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
      accountName: user?.firstName ?? '',
      bank: {},
      accountNo: '',
    },
    validationSchema: Yup.object({
      accountName: validation.accountName,
      // bank: validation.sysId,
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

  function onAmountChanged(text: string) {
    if (text != null) {
      const cleanText = text.replace(/[^0-9]/g, '')
      if (cleanText === values.accountNo) return
      let amountNumber = parseFloat(cleanText)
      if (isNaN(amountNumber)) amountNumber = 0
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
              value: values.bank?.bank_name,
            }}
            _flatList={{
              data: data,
              isLoading: isLoading || isFetching,
              selectedData: values.bank?.bank_code,
            }}
            _actionSheet={{
              headerTitle: 'bank.bank',
            }}
            onPress={(bank) => {
              setFieldValue('bank', bank)
            }}
          />

          <TextField.TextInput
            label="bank.accountNo"
            _input={{
              placeholder: t('bank.enterAccountNo'),
              value: values.accountNo,
              onChangeText: onAmountChanged,
              onBlur: handleBlur('accountNo'),
              keyboardType: 'number-pad',
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
