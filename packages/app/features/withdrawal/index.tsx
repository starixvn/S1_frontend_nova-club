import { Button } from 'app/components/form/Button'
import Select from 'app/components/form/Select'
import { GradientBoxText } from 'app/components/GradientBoxText'
import { useAppSelector } from 'app/provider/redux/store'
import { styled, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import ImportantNotice from 'app/components/ImportantNotice'
import BankSelector from 'app/components/BankSelector'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert'
import { useRouter } from 'solito/router'
import { useSubmitWithdrawalMutation } from 'app/services/withdrawal'
import { toRealAmount } from 'app/utils'
import { usePlayerWithdrawalBankQuery } from 'app/services/bank'

type WithdrawalValues = {
  amount: string
  realAmount: number
  bankId: number
}

const NOTES = ['note.w1', 'note.w2', 'note.w3', 'note.w4', 'note.w5']

const WithdrawalPage = () => {
  const dispatch = useDispatch()
  const { replace } = useRouter()
  const user = useAppSelector((state) => state.player.currentLoginUser)
  const { data, isLoading, isFetching, isSuccess } =
    usePlayerWithdrawalBankQuery({
      username: user?.username ?? '',
    })
  const [postSubmitWithdrawal] = useSubmitWithdrawalMutation()
  const [convertedData, setConvertedData] = useState([])
  const [selectedBank, setSelectedBank] = useState()

  const onSubmit = async (
    { amount, realAmount }: WithdrawalValues,
    actions: FormikHelpers<WithdrawalValues>
  ) => {
    try {
      const { data, success, message } = await postSubmitWithdrawal({
        amount: realAmount,
        bank_acc_name: '112233',
        bank_acc_num: '112233',
        bank_details_id: 1,
        bank_type_id: 1,
        crypto_address: '112233',
        crypto_protocol: '112233',
        exchange_rate: 1,
        username: user?.username ?? '',
      }).unwrap()
      console.log(
        '🚀 ~ file: index.tsx ~ line 64 ~ WithdrawalPage ~ data',
        data
      )

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()

        replace('/profile')
      } else {
        dispatch(AlertActions.addError(message))
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  const formik = useFormik<WithdrawalValues>({
    initialValues: {
      amount: '',
      realAmount: 0,
      bankId: 0,
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
    <StyledView>
      <GradientBoxText labelWidth={0.55}>
        <Select
          headerTitle={'Player Withdrawal bank'}
          buttonTitle="Player withdrawal bank"
          buttonProps={{
            sx: {
              borderColor: 'transparent',
            },
            isActive: false,
          }}
          setSelectedValue={(value) => console.log('selected value', value)}
        >
          <BankSelector
            bankList={convertedData}
            isLoading={isLoading || isFetching}
            selectedBank={values.bankId}
            onPress={(id) => {
              setSelectedBank(id)
              setFieldValue('bank', id)
            }}
          />
        </Select>

        <GradientBoxText.TextInput
          label="Amount"
          _input={{
            placeholder: 'Please enter your withdrawal amount',
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
      </GradientBoxText>
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  background: '$secondary',
  p: '$4',
}))

export default WithdrawalPage
