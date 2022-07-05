import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { RootState, useAppSelector } from 'app/provider/redux/store'
import {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
  useSubmitManualDepositMutation,
} from 'services/deposit'
import { AlertActions } from 'app/store/alert'
import {
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import { DepositMethodId } from '..'
import DepositUpload from '../DepositUpload'
import BankItem from 'app/components/actionsheet/BankItem'
import { SheetManager } from 'react-native-actions-sheet'
import { DEFAULT_SQUARE_ACTION_SHEET_ID } from 'app/components/actionsheet/SquareSelectorActionSheet'
import { ManualBankItem } from 'services/deposit.type'
import { Currency, DepositPaymentMethodCategoryId } from 'app/utils/constant'
import validationRule from 'app/utils/validationRule'
import { useModal } from 'react-native-modalfy'

type LocalBankValues = {
  bank: ManualBankItem | null
  amount: string
  realAmount: number
}

const actionSheetId = 'LocalBank'

const LocalBankScreen = () => {
  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Deposit
  )
  const to = makeContextualHref('deposit-loader')

  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { push, back } = useRouter()
  const { openModal } = useModal()
  const [limit, setLimit] = useState({ minAmount: 0, maxAmount: 0 })
  const [postSubmitManualDeposit] = useSubmitManualDepositMutation()
  const { data, isLoading, isFetching } = useDepositPaymentListQuery()

  const userInfo = useSelector((s: RootState) => s.auth.user)
  const currency = userInfo?.currency as Currency

  const depositPayment = data?.data?.result.manual.find(
    (el) => el.category_id === DepositPaymentMethodCategoryId.LOCAL_BANK
  )

  useEffect(() => {
    if (data?.success) {
      setFieldValue('bank', depositPayment?.list[0])
      setLimit({
        minAmount: depositPayment?.list[0]?.minDeposit ?? 0,
        maxAmount: depositPayment?.list[0]?.maxDeposit ?? 0,
      })
    }
  }, [data])

  const onSubmit = async (
    { bank, realAmount }: LocalBankValues,
    actions: FormikHelpers<LocalBankValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postSubmitManualDeposit({
        acc_name: bank?.bank_acc_name ?? '',
        amount: realAmount,
        bank_type_id: bank?.bankTypeId ?? 0,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<LocalBankValues>({
    initialValues: {
      bank: null,
      amount: '',
      realAmount: 0,
    },
    validationSchema: Yup.object({
      realAmount: validation.amount,
      bank: validation.bank,
      amount: validationRule.amount({
        min: toDisplayAmount(limit.minAmount, currency),
        max: toDisplayAmount(limit.maxAmount, currency),
      }),
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

  function handleConfirmDeposit() {
    openModal('DepositConfirmationModal', {
      amount: values.realAmount,
      callback: () => submitForm(),
    })
  }

  return (
    <PageWithBackHeader
      header={{ title: depositPayment?.category_text ?? t('menu.deposit') }}
    >
      <View sx={{ flex: 1 }}>
        <TextField labelWidth={0}>
          <TextField.Select
            label=""
            _input={{
              placeholder: t('bank.selectBank'),
              value: values.bank?.bank_acc_name ?? '',
            }}
            _flatList={{
              data: depositPayment?.list ?? [],
              isLoading: isLoading || isFetching,
              titleType: 'bank_acc_name',
              onPress: (item) => setFieldValue('bank', item),
            }}
            _actionSheet={{
              id: actionSheetId,
              headerTitle: t('bank.bank'),
            }}
          />
        </TextField>
        <TextField labelWidth={0.7}>
          <TextField.Label
            label="bank.accountName"
            value={values.bank?.bank_acc_name ?? ''}
            sx={{ my: 0 }}
            copy
          />
          <TextField.Label
            label="bank.accountNumber"
            value={values.bank?.bank_acc_no ?? ''}
            sx={{ my: 0 }}
            copy
          />
          <TextField.TextInput
            label="deposit.depositAmount"
            _input={{
              placeholder: t('validation.minMaxLimit', {
                min: toCurrency(limit.minAmount ?? 0, currency, {
                  symbol: false,
                  forceDecimal: false,
                }),
                max: toCurrency(limit.maxAmount ?? 0, currency, {
                  symbol: false,
                  forceDecimal: false,
                }),
              }),
              value: values.amount,
              keyboardType: 'number-pad',
              onChangeText: onAmountChanged,
              onBlur: handleBlur('amount'),
            }}
            error={
              touched.amount && errors.amount
                ? t(errors.amount, {
                    field: t('common.amount'),
                    amount: values.amount,
                    min: toCurrency(limit.minAmount ?? 0, currency, {
                      forceDecimal: false,
                      symbol: false,
                    }),
                  })
                : undefined
            }
            containerStyle={{ mt: '$0', mb: '$4' }}
          />
        </TextField>

        <DepositUpload />

        <Button
          rounded
          stretch
          loading={isSubmitting}
          disabled={!isValid || !dirty}
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          containerStyle={{
            m: '$10',
          }}
          onPress={handleConfirmDeposit}
        >
          <Button.Label>{t('common.next')}</Button.Label>
        </Button>
      </View>
    </PageWithBackHeader>
  )
}

export default LocalBankScreen
