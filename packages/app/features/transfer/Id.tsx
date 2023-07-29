import IconButton from 'app/components/IconButton'
import MoneyInput from 'app/components/MoneyInput'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import validation from 'app/utils/validation'
import { ScrollView } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  usePlayerBalanceQuery,
  useTransferMemberToMemberMutation,
} from 'services/walletApi'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

type IdTransferFormValues = {
  idTransfer: string
  amount: string
  realAmount: number
}

const { useParam } = createParam<{ referralCode: string }>()

const IdTransfer = () => {
  const { t } = useLocalization()
  const { back } = useRouter()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const { push } = useRouter()
  const [postTransferMemberToMember] = useTransferMemberToMemberMutation()

  const { data: playerData, currency } = usePlayerProfileQuery()
  const isPinExist = playerData?.pin_exist
  const [referralCode] = useParam('referralCode', { initial: '' })

  const { data } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const onSubmit = async (
    { idTransfer, amount, realAmount }: IdTransferFormValues,
    transferPin: string,
    actions: FormikHelpers<IdTransferFormValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postTransferMemberToMember({
        amount: realAmount,
        transfer_pin: transferPin,
        to_invitation_code: idTransfer,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()
        back()
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }
  const formik = useFormik<IdTransferFormValues>({
    initialValues: {
      idTransfer: '',
      amount: '',
      realAmount: 0,
    },
    validationSchema: Yup.object({
      idTransfer: validation.amount,
      amount: validation.amount,
    }),
    onSubmit,
  })

  function onAmountChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text.toString())
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

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
    resetForm,
    setValues,
    setFieldValue,
  } = formik

  const handleSubmit = () => {
    openModal('PinModal', {
      onConfirm: (value) => onSubmit(values, value, formik),
      onForgotPin: () => {
        push('/account/manage-credentials/forgot-pin')
        console.log('gg')
      },
    })
  }

  const handleMaxAmount = () => {
    const value = toCurrency(Number(data?.totalBalance), currency, {
      symbol: false,
      hideTruncatedThousand: false,
    })

    setValues({
      ...values,
      amount: value.slice(0, -1),
      realAmount: toRealAmount(value.replaceAll(',', '')),
    })
  }

  useEffect(() => {
    setFieldValue('idTransfer', referralCode)
    if (referralCode === playerData?.referral_code)
      openModal('AlertModal', {
        message: t('status.qrTransferSelfError'),
        onClose: () => back(),
      })

    if (!referralCode) {
      resetForm()
    }
  }, [referralCode])

  useEffect(() => {
    !isPinExist && push('/account/manage-credentials/create-pin')
  }, [isPinExist])

  return (
    <FormContainer>
      <ScrollView>
        <AvailableBalance
          label={`${t('transfer.transferableAmount')} :`}
          isTransfer
        />

        <Input
          label={t('transfer.idTransfer')}
          placeholder={t('transfer.placeholderTransferId')}
          value={values.idTransfer}
          onChangeText={handleChange('idTransfer')}
          onBlur={handleBlur('idTransfer')}
          error={
            touched.idTransfer && errors.idTransfer
              ? t(errors.idTransfer, {
                  field: t('transfer.idTransfer'),
                })
              : undefined
          }
        />

        <MoneyInput
          label={t('common.amount')}
          placeholder={t('transfer.placeholderTransferAmount')}
          keyboardType="number-pad"
          value={values.amount}
          onChangeText={onAmountChanged}
          onBlur={handleBlur('amount')}
          maxLength={13}
          error={
            touched.amount && errors.amount
              ? t(errors.amount, {
                  field: t('common.amount'),
                  amount: toCurrency(values.realAmount ?? 1, currency, {
                    forceDecimal: false,
                    symbol: false,
                  }),
                  min: 1,
                })
              : undefined
          }
          actions={
            <IconButton
              name="cash"
              size={18}
              color={'$secondary.100'}
              onPress={handleMaxAmount}
            />
          }
        />

        <Button
          onPress={handleSubmit}
          disabled={!isValid || !dirty}
          sx={{ mt: '$4' }}
        >
          {t('common.confirm')}
        </Button>
      </ScrollView>
    </FormContainer>
  )
}

export default IdTransfer
