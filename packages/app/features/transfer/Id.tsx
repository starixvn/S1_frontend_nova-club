import IconButton from 'app/components/IconButton'
import MoneyInput from 'app/components/MoneyInput'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input, { Label } from 'app/components/form/Input'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import {
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import validation, { getErrorMessage } from 'app/utils/validation'
import validationRule from 'app/utils/validationRule'
import { Row, ScrollView, Text } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  useLazyGetUsernameByCodeQuery,
  usePlayerBalanceQuery,
  useTransferMemberToMemberMutation,
} from 'services/walletApi'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { Currency } from 'utils/constant'
import * as Yup from 'yup'

type IdTransferFormValues = {
  idTransfer: string
  amount: string
  realAmount: number
}

const { useParam } = createParam<{ referralCode: string }>()

const IdTransfer = ({ isIDTransfer = false }: { isIDTransfer?: boolean }) => {
  const { t } = useLocalization()
  const { back } = useRouter()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const [postTransferMemberToMember] = useTransferMemberToMemberMutation()
  const [getUsernameByCode] = useLazyGetUsernameByCodeQuery()
  const [referralCode] = useParam('referralCode', { initial: '' })

  const [idUsername, setIdUsername] = useState('')
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')

  const { data } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  })
  const playerBalance = data?.main.balance

  const isPinExist = playerData?.pin_exist
  const currency = playerData?.currency as Currency

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
        Toast.show({ type: 'success', text1: t('status.success') })
        actions.resetForm()
        push('/transfer/receive')
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
      idTransfer: validation.referralCode,
      amount: validationRule.amount({
        min: toDisplayAmount(1, currency),
        max: toDisplayAmount(
          playerBalance !== '0' ? playerBalance : 1,
          currency
        ),
      }),
    }),
    onSubmit,
  })

  function onAmountChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text.toString())
      setValues({
        ...values,
        amount: cleanText ? cleanText : '',
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
    resetForm,
    setValues,
    setFieldValue,
  } = formik

  const handleSubmit = () => {
    openModal('PinModal', {
      onConfirm: (value) => onSubmit(values, value, formik),
      onForgotPin: () => {
        push('/account/manage-credentials/forgot-pin')
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
    if (playerData)
      !isPinExist && push('/account/manage-credentials/create-pin')

    return () => {
      !isIDTransfer && dispatch(SettingActions.toggleScan(true))
    }
  }, [isPinExist])

  const onCheckIdTransfer = async () => {
    if (!errors.idTransfer) {
      try {
        const { success, data } = await getUsernameByCode({
          to_invitation_code: values.idTransfer,
        }).unwrap()

        if (success) {
          setIdUsername(data?.username ?? '')
          setUsernameErrorMsg('')
        }
      } catch (error) {
        setIdUsername('')
        const errorMessage = getErrorMessage(error)
        setUsernameErrorMsg(errorMessage)
      }
    }
  }

  return (
    <FormContainer>
      <ScrollView>
        <AvailableBalance label={t('transfer.transferableAmount')} />

        <Input
          nativeID="idTransfer"
          label={t('transfer.idTransfer')}
          placeholder={t('transfer.placeholderTransferId')}
          value={values.idTransfer}
          onChangeText={handleChange('idTransfer')}
          onBlur={(e) => {
            handleBlur(e)
            onCheckIdTransfer()
          }}
          // onBlur={handleBlur('idTransfer')}
          error={
            touched.idTransfer && errors.idTransfer
              ? t(errors.idTransfer, {
                  field: t('transfer.idTransfer'),
                })
              : usernameErrorMsg
              ? usernameErrorMsg
              : undefined
          }
        />

        <Row sx={{ mb: '$2' }}>
          <Label sx={{ mr: '$2' }}>{t('common.username')}:</Label>
          <Text>{idUsername}</Text>
        </Row>

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
          disabled={!isValid || !dirty || usernameErrorMsg !== ''}
          sx={{ mt: '$4' }}
        >
          {t('common.confirm')}
        </Button>
      </ScrollView>
    </FormContainer>
  )
}

export default IdTransfer
