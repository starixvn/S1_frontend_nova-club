import { TextField } from 'app/components/TextField'
import React, { useEffect } from 'react'
import { useDepositPaymentListQuery } from 'services/deposit'
import {
  PlayerInputFieldsAmount,
  PlayerInputFieldsBank,
} from 'services/deposit.type'
import FieldAmount from './FieldAmount'
import FieldSelectBank from './FieldSelectBank'

const AutoDepositForm = ({ formik, DepositCategoryId }) => {
  const { data, isLoading, isFetching } = useDepositPaymentListQuery()
  const depositPayment = data?.data?.result.auto.find(
    (el) => el.category_id === DepositCategoryId
  )
  const paymentGateway = depositPayment?.list[0]
  const inputFields = Object.values(
    depositPayment?.list[0].player_input_fields ?? {}
  )

  const fieldBank = inputFields.find(
    (el: PlayerInputFieldsBank) => el.type === 'bank_list'
  ) as PlayerInputFieldsBank

  const fieldAmount = inputFields.find(
    (el: PlayerInputFieldsAmount) => el.type === 'float_amount'
  ) as PlayerInputFieldsAmount

  useEffect(() => {
    paymentGateway && setFieldValue('paymentGateway', paymentGateway)
  }, [paymentGateway])

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

  return (
    <TextField labelWidth={0}>
      <FieldSelectBank
        field={fieldBank}
        isLoading={isLoading || isFetching}
        formik={formik}
      />
      <FieldAmount field={fieldAmount} formik={formik} />
    </TextField>
  )
}

export default AutoDepositForm
