import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
  useSubmitManualDepositMutation,
} from 'services/deposit'
import { AlertActions } from 'app/store/alert'
import { toCleanAmount, toRealAmount } from 'app/utils'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Linking, Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import { DepositMethodId } from '..'
import DepositUpload from '../DepositUpload'
import BankItem from 'app/components/actionsheet/BankItem'
import { SheetManager } from 'react-native-actions-sheet'
import { DEFAULT_SQUARE_ACTION_SHEET_ID } from 'app/components/actionsheet/SquareSelectorActionSheet'
import { ManualBankItem } from 'services/deposit.type'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'

type LocalBankValues = {
  bank: ManualBankItem | null
  amount: string
  realAmount: number
}

const actionSheedId = 'LocalBank'

const LocalBankScreen = () => {
  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Deposit
  )
  const to = makeContextualHref('deposit-loader')

  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { push, back } = useRouter()

  const [postSubmitManualDeposit] = useSubmitManualDepositMutation()
  const { data, isLoading, isFetching } = useDepositPaymentListQuery()
  const depositPayment = data?.data?.result.manual.find(
    (el) => el.category_id === DepositPaymentMethodCategoryId.LOCAL_BANK
  )

  const onSubmit = async (
    { bank, realAmount }: LocalBankValues,
    actions: FormikHelpers<LocalBankValues>
  ) => {
    try {
      const { data, success, message } = await postSubmitManualDeposit({
        acc_name: bank?.bank_acc_name ?? '',
        amount: realAmount,
        bank_type_id: bank?.bankTypeId ?? 0,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      const webUrl = 'https://reactnative.dev/'
      const url = webUrl && encodeURIComponent(webUrl)
      openWebView(url, webUrl)

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
        back()
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
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

  const openWebView = (url, webUrl) => {
    if (!url) return null
    if (Platform.OS === 'web' && url) {
      Linking.openURL(webUrl)
    } else {
      push(to, {
        pathname: '/deposit/depositUrl',
        query: {
          depositUrl: url,
        },
      })
    }
  }

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
              numColumns: 4,
              keyExtractor: (item: ManualBankItem) =>
                `${item.bankTypeId} ${item.bank_acc_name}`,
              renderItem: ({ item }: { item: ManualBankItem }) => (
                <BankItem
                  key={item.bankTypeId}
                  icon={require('app/assets/images/home/fishing.png')}
                  title={item.bank_acc_name}
                  onPress={async () => {
                    setFieldValue('bank', item)
                    await SheetManager.hide(
                      actionSheedId ?? DEFAULT_SQUARE_ACTION_SHEET_ID
                    )
                  }}
                />
              ),
            }}
            _actionSheet={{
              id: actionSheedId,
              headerTitle: t('bank.bank'),
            }}
          />
        </TextField>
        <TextField labelWidth={0.55}>
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
          <TextField.Label
            label="common.referenceId"
            value={values.bank?.pay_acc_id ?? ''}
            sx={{ my: 0 }}
          />
          <TextField.TextInput
            label="deposit.depositAmount"
            _input={{
              placeholder: values.bank
                ? `${values.bank?.minDeposit} - ${values.bank?.maxDeposit}`
                : '0',
              value: values.amount,
              keyboardType: 'number-pad',
              onChangeText: onAmountChanged,
              onBlur: handleBlur('amount'),
            }}
            error={touched.amount && errors.amount ? errors.amount : undefined}
            containerStyle={{ mt: '$0', mb: '$4' }}
          />
        </TextField>

        <DepositUpload />

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
          containerStyle={{
            m: '$10',
          }}
          onPress={submitForm}
        >
          <Button.Label>{t('common.next')}</Button.Label>
        </Button>
      </View>
    </PageWithBackHeader>
  )
}

export default LocalBankScreen
