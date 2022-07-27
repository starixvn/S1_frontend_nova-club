import { Button } from 'app/components/form/Button'
import { TextField } from 'app/components/TextField'
import { styled, View } from 'dripsy'
import React, { useRef } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import ImportantNotice from 'app/components/ImportantNotice'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert'
import { useRouter } from 'solito/router'
import { useSubmitWithdrawalMutation } from 'services/withdrawal'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { usePlayerBankQuery } from 'services/bank'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { PlayerBankResult } from 'services/bank.type'
import { Currency } from 'app/utils/constant'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'
import { getBankLogo } from 'app/config/bank'

const actionSheetId = ACTION_SHEET_ID.WITHDRAWAL

type WithdrawalValues = {
  amount: string
  realAmount: number
  bank: PlayerBankResult | undefined
}

const NOTES = ['note.w1', 'note.w2', 'note.w3', 'note.w4', 'note.w5']
const CONFIRMATION_FIELDS = [
  {
    label: 'withdrawal.withdrawTo',
    value: 'bankName',
  },
  {
    label: 'bank.accountName',
    value: 'accountName',
  },
  {
    label: 'bank.accountNumber',
    value: 'accountNumber',
  },
  {
    label: 'common.amount',
    value: 'amount',
  },
]

const WithdrawalPage = () => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { back } = useRouter()
  const { openModal } = useModal()
  const { data, isLoading, isFetching } = usePlayerBankQuery()
  const [postSubmitWithdrawal] = useSubmitWithdrawalMutation()

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const onSubmit = async (
    { bank, realAmount }: WithdrawalValues,
    actions: FormikHelpers<WithdrawalValues>
  ) => {
    try {
      actions.setSubmitting(true)
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
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<WithdrawalValues>({
    initialValues: {
      amount: '',
      realAmount: 0,
      bank: undefined,
    },
    validationSchema: Yup.object({
      bank: validation.bank,
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
      const { cleanText, amountNumber } = toCleanAmount(text)
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

  function withdrawalConfirmation() {
    openModal('WithdrawalConfirmationModal', {
      withdrawalInfo: {
        bankName: values.bank.BankName,
        accountName: values.bank.BankAccountFullName,
        accountNumber: values.bank.BankAccountNumber,
        amount:
          toCurrency(values.realAmount, currency, {
            forceDecimal: false,
            hideTruncatedThousand: false,
          }) ?? '',
      },
      bankLogo: getBankLogo(values.bank?.BankCode),
      fields: CONFIRMATION_FIELDS,
      onConfirm: () => onSubmit(values, formik),
    })
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.withdraw') }}>
      <StyledView>
        <TextField labelWidth={0.3}>
          <TextField.Select
            label="bank.bank"
            _input={{
              placeholder: t('bank.selectBank'),
              value: values.bank?.BankAccountFullName ?? '',
            }}
            _dataList={{
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
            isAmount
            _input={{
              placeholder: t('common.enterAmount', {
                field: t('menu.withdraw').toLowerCase(),
              }),
              value: values.amount,
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
            onPress={withdrawalConfirmation}
          >
            <Button.Label>{t('common.next')}</Button.Label>
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
