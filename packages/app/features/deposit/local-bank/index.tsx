import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import {
  useDepositPaymentListQuery,
  useSubmitManualDepositMutation,
  useUploadDepositSlipMutation,
} from 'services/deposit'
import { AlertActions } from 'app/store/alert.slice'
import {
  copyToClipboard,
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import DepositUpload from '../DepositUpload'
import { ManualBankItem } from 'services/deposit.type'
import { Currency, DepositPaymentMethodCategoryId } from 'app/utils/constant'
import validationRule from 'app/utils/validationRule'
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { Platform } from 'react-native'
import useLocalBankDeposit from 'app/hooks/deposit/useLocalBankDeposit'
import { FilePickerForwardRef } from 'app/components/FilePicker'
import InputBase from 'app/components/form/Input/InputBase'
import IconButton from 'app/components/form/IconButton'
import Select from 'app/components/form/Input/Select'
import MoneyInput from 'app/components/form/Input/MoneyInput'
import DepositTransactions from './DepositTransactions'
import PaymentMethod from 'app/config/deposit'

export type LocalBankValues = {
  bank: ManualBankItem | null
  amount: string
  realAmount: number
}

const actionSheetId = ACTION_SHEET_ID.LOCAL_BANK

const LocalBankScreen = () => {
  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('deposit-loader')

  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { push, back } = useRouter()
  const { openModal } = useModal()
  const [limit, setLimit] = useState({ minAmount: 0, maxAmount: 0 })
  const [selectedImage, setSelectedImage] = useState('')
  const filePickerRef = useRef<FilePickerForwardRef>(null)

  const { data, isLoading, isFetching } = useDepositPaymentListQuery()

  const { postDepositSubmit } = useLocalBankDeposit({
    selectedImage,
  })

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

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
    values: LocalBankValues,
    actions: FormikHelpers<LocalBankValues>
  ) => {
    await postDepositSubmit(values, actions)
    console.log('wating')
    filePickerRef.current?.resetFile()
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
      header={{ title: PaymentMethod[0].name ?? t('menu.deposit') }}
    >
      <View sx={{ flex: 1 }}>
        <TextField labelWidth={0}>
          <TextField.Select
            label=""
            _input={{
              placeholder: t('bank.selectBank'),
              value: values.bank?.bank_acc_name ?? '',
              pointerEvents: 'none',
            }}
            _dataList={{
              data: depositPayment?.list ?? [],
              isLoading: isLoading || isFetching,
              key: 'bankTypeId',
              titleType: 'bank_acc_name',
              onPress: (item) => setFieldValue('bank', item),
            }}
            _actionSheet={{
              id: actionSheetId,
              headerTitle: t('bank.bank'),
            }}
          />
        </TextField>
        <Select
          sx={{ mb: 0, mt: '$2' }}
          label={t('bank.selectBank')}
          options={[]}
        />
        <InputBase
          removeBorder
          label={t('bank.accountName')}
          sx={{ mb: 0 }}
          value={values.bank?.bank_acc_name}
          editable={false}
          action={
            <IconButton
              sx={{ p: '$2' }}
              name="copy"
              size={18}
              color={'$lightCyan'}
              onPress={() => copyToClipboard(values.bank?.bank_acc_name)}
            />
          }
        />
        <InputBase
          removeBorder
          sx={{ mb: 0 }}
          label={t('bank.accountName')}
          value={values.bank?.bank_acc_no}
          editable={false}
          action={
            <IconButton
              sx={{ p: '$2' }}
              name="copy"
              size={18}
              color={'$lightCyan'}
              onPress={() => copyToClipboard(values.bank?.bank_acc_no)}
            />
          }
        />
        <MoneyInput
          label={t('deposit.depositAmount')}
          onChangeText={onAmountChanged}
          keyboardType={'number-pad'}
          onBlur={handleBlur('amount')}
          value={values.amount}
          placeholder={t('validation.minMaxLimit', {
            min: toCurrency(limit.minAmount ?? 0, currency, {
              symbol: false,
              forceDecimal: false,
            }),
            max: toCurrency(limit.maxAmount ?? 0, currency, {
              symbol: false,
              forceDecimal: false,
            }),
          })}
          error={
            touched.amount && errors.amount
              ? t(errors.amount, {
                  field: t('common.amount'),
                  amount: toCurrency(values.realAmount ?? 0, currency, {
                    forceDecimal: false,
                    symbol: false,
                  }),
                  min: toCurrency(limit.minAmount ?? 0, currency, {
                    forceDecimal: false,
                    symbol: false,
                  }),
                })
              : undefined
          }
        />

        <DepositUpload
          onImagePicked={(path) => setSelectedImage(path)}
          innerRef={filePickerRef}
        />

        <Button
          rounded
          stretch
          loading={isSubmitting}
          disabled={!isValid || !dirty || !selectedImage}
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

        <DepositTransactions />
      </View>
    </PageWithBackHeader>
  )
}

export default LocalBankScreen
