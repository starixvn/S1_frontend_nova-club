import React, { useReducer, useState } from 'react'
import { GradientBoxText } from 'app/components/GradientBoxText'
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
import BankSelector from 'app/components/BankSelector'
import { Dimensions } from 'react-native'
import {
  useAddWithdrawalBankAccMutation,
  useWithdrawalBankQuery,
} from 'app/services/bank'
import { AlertActions } from 'app/store/alert'
import { useRoute } from '@react-navigation/native'
import { useRouter } from 'solito/router'

type AddBankAccountValues = {
  accountName: string
  bank: number
  accountNo: string
}

const AddBankAccountScreen = () => {
  const dispatch = useDispatch()
  const { replace, back } = useRouter()
  const user = useAppSelector((state) => state.player.currentLoginUser)
  const { data, isLoading, isFetching, isSuccess } = useWithdrawalBankQuery({
    username: user?.username ?? '',
  })
  const [postAddWithdrawalBankAcc] = useAddWithdrawalBankAccMutation()

  const onSubmit = async (
    { accountName, bank, accountNo }: AddBankAccountValues,
    actions: FormikHelpers<AddBankAccountValues>
  ) => {
    try {
      const { data, success, message } = await postAddWithdrawalBankAcc({
        bank_acc_name: 'bankAcc',
        bank_acc_num: accountNo,
        bank_address: 'bankAcc',
        bank_type_id: bank,
        branch: 'bankAcc',
        city: 'bankAcc',
        province: 'bankAcc',
        username: user?.username ?? '',
      }).unwrap()
      console.log(
        '🚀 ~ file: index.tsx ~ line 64 ~ WithdrawalPage ~ data',
        data
      )

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()

        back()
      } else {
        dispatch(AlertActions.addError(message))
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  const formik = useFormik<AddBankAccountValues>({
    initialValues: {
      accountName: user?.firstName ?? '',
      bank: 0,
      accountNo: '',
    },
    validationSchema: Yup.object({
      accountName: validation.accountName,
      bank: validation.sysId,
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
    <StyledView>
      <GradientBoxText labelWidth={0.55}>
        <GradientBoxText.TextInput
          label="Account name"
          _input={{
            placeholder: "Please enter your 'Registered Real Name",
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
        <GradientBoxText.TextInput
          label="Bank"
          _input={{
            placeholder: 'Please select bank',
            value: values.bank.toString(),
            onChangeText: handleChange('bank'),
            onBlur: handleBlur('bank'),
          }}
          error={touched.bank && errors.bank ? errors.bank : undefined}
          containerStyle={{ my: '$0' }}
        />
        <Select
          headerTitle={'Period'}
          buttonTitle="Click here to oopen"
          buttonProps={{
            sx: {
              borderColor: 'transparent',
            },
            isActive: false,
          }}
          actionSheetContentProps={{
            sx: {
              minHeight: Dimensions.get('window').height * 0.2,
            },
          }}
          // setSelectedValue={setSelected}
        >
          <BankSelector
            bankList={data}
            isLoading={isLoading || isFetching}
            selectedBank={values.bank}
            onPress={(bank) => {
              setFieldValue('bank', bank.id)
            }}
          />
        </Select>
        <GradientBoxText.TextInput
          label="Account no"
          _input={{
            placeholder: 'Please enter account',
            value: values.accountNo,
            onChangeText: onAmountChanged,
            onBlur: handleBlur('accountNo'),
            keyboardType: 'number-pad',
          }}
          error={
            touched.accountNo && errors.accountNo ? errors.accountNo : undefined
          }
          containerStyle={{ my: '$0' }}
        />
      </GradientBoxText>

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
