import Button from 'app/components/common/Button'
import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ToThousandValue, toCleanAmount, toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { ScrollView, Text, View, useDripsyTheme } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import * as Yup from 'yup'

import IconButton from 'app/components/IconButton'
import useAlert from 'app/hooks/useAlert'
import { FormikHelpers, useFormik } from 'formik'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  usePlayerBalanceQuery,
  useTransferMemberToMemberMutation,
} from 'services/walletApi'
import { useRouter } from 'solito/router'
import AvailableBalance from 'app/features/withdrawal/components/AvailableBalance'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'

type IdTransferFormValues = {
  idTransfer: string
  amount: string
  realAmount: string
}

const IdTransfer = () => {
  const { t } = useLocalization()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { back } = useRouter()
  const { showAlert } = useAlert()
  const { theme } = useDripsyTheme()
  const { openModal } = useModal()
  const { push } = useRouter()
  const [postTransferMemberToMember] = useTransferMemberToMemberMutation()

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !token,
  })

  const { isFetching, wallets } = usePlayerBalanceQuery(undefined, {
    selectFromResult: (s) => ({
      ...s,
      wallets: s.data?.data,
    }),
    skip: !token,
  })

  const balance = wallets?.main.balance ?? ''

  const onSubmit = async (
    { idTransfer, amount, realAmount }: IdTransferFormValues,
    transferPin: string,
    actions: FormikHelpers<IdTransferFormValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postTransferMemberToMember({
        amount: parseInt(realAmount) * 1000,
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
      realAmount: '',
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
        realAmount: amountNumber.toString(),
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
    setValues,
  } = formik

  const handleSubmit = () => {
    console.log('recallpin modal')
    openModal('PinModal', {
      onConfirm: (value) => onSubmit(values, value, formik),
      onForgotPin: () => {
        push('/account/manage-credentials/forgot-pin')
        console.log('gg')
      },
    })
  }
  return (
    <DesktopPageContainer>
      <ScrollView
        contentContainerSx={{
          padding: '10%',
        }}
      >
        <AvailableBalance label={'Available Amount:'} />

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
        <Input
          label={t('common.amount')}
          placeholder={t('transfer.placeholderTransferAmount')}
          keyboardType="number-pad"
          value={values.amount}
          onChangeText={onAmountChanged}
          onBlur={handleBlur('amount')}
          error={
            touched.amount && errors.amount
              ? t(errors.amount, {
                  field: t('common.amount'),
                  min: 1,
                })
              : parseInt(values.realAmount) >
                parseInt(
                  ToThousandValue({ number: parseInt(balance), decimal: false })
                )
              ? 'Cannot more than'
              : undefined
          }
          maxLength={13}
          action={() => {
            return (
              <View>
                <View
                  sx={{
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                  }}
                >
                  <IconButton
                    name="cash"
                    size={16}
                    sx={{ mr: '$1' }}
                    color={theme.colors.$secondary[100]}
                    disabled={!!!balance}
                    onPress={() => {
                      onAmountChanged(
                        ToThousandValue({
                          number: parseInt(balance),
                          decimal: false,
                        })
                      )
                    }}
                  />
                </View>
                <Text sx={{ color: '$secondary.100' }}>
                  {values.realAmount && parseInt(values.realAmount) > 0
                    ? '= ' + values.amount + 'K'
                    : '= 0K'}
                </Text>
              </View>
            )
          }}
        />
        <Button
          onPress={handleSubmit}
          disabled={
            !isValid ||
            !dirty ||
            parseInt(values.realAmount) >
              parseInt(
                ToThousandValue({ number: parseInt(balance), decimal: false })
              )
          }
          sx={{ mt: '$4' }}
        >
          {t('common.confirm')}
        </Button>
      </ScrollView>
    </DesktopPageContainer>
  )
}

export default IdTransfer
