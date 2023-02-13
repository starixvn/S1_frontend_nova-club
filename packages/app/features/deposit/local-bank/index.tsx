import MenuNotice from 'app/components/common/MenuNotice'
import { Button } from 'app/components/form/Button'
import { FileInputValue } from 'app/components/form/FileInput/useFileInputHandler'
import IconButton from 'app/components/form/IconButton'
import InputBase, {
  INPUT_BASE_SPACE,
} from 'app/components/form/Input/InputBase'
import MoneyInput from 'app/components/form/Input/MoneyInput'
import Select from 'app/components/form/Input/Select'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { getBankLogo } from 'app/config/bank'
import PaymentMethod, {
  DepositPaymentMethodCategoryId,
} from 'app/config/deposit'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { DEPOSIT_NOTES } from 'app/constant/notes'
import useAlert from 'app/hooks/useAlert'
import useCheckMobile from 'app/hooks/useCheckMobile'
import useLocalization from 'app/provider/localization'
import {
  copyToClipboard,
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import validationRule from 'app/utils/validationRule'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  useDepositPaymentListQuery,
  useSubmitManualDepositMutation,
} from 'services/deposit'
import { ManualBankItem } from 'services/deposit.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import * as Yup from 'yup'
import ReceiptUpload, { ReceiptUploadMethods } from '../ReceiptUpload'
import DepositTransactions from './DepositTransactions'

export type LocalBankValues = {
  bank: ManualBankItem | null
  amount: string
  realAmount: number
  receipt?: FileInputValue
}

const LocalBankScreen = () => {
  const { showAlert } = useAlert()
  const { t } = useLocalization()
  const { openModal } = useModal()
  const [limit, setLimit] = useState({ minAmount: 0, maxAmount: 0 })
  const depositUploadRef = useRef<ReceiptUploadMethods>(null)

  const { isMobile } = useCheckMobile()
  const { data, isLoading, isFetching } = useDepositPaymentListQuery({
    is_mobile: isMobile ? 0 : 1,
  })

  const [submitDeposit] = useSubmitManualDepositMutation()

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  const depositPayment = data?.data?.result.manual.find(
    (el) => el.category_id === DepositPaymentMethodCategoryId.LOCAL_BANK
  )

  const sheetData = depositPayment?.list.map((item) => {
    return {
      label: item.bank_acc_name,
      value: item.bankTypeId,
      icon: getBankLogo(item.bank_code),
    }
  })

  const handleSelected = (value) => {
    const item = depositPayment?.list?.find(
      (el) => el.bankTypeId === value.value
    )
    setFieldValue('bank', item)
  }

  useEffect(() => {
    if (data?.success) {
      setFieldValue('bank', depositPayment?.list[0])
    }
  }, [data])

  const onSubmit = async (
    { bank, realAmount, receipt }: LocalBankValues,
    actions: FormikHelpers<LocalBankValues>
  ) => {
    try {
      const depositResp = await submitDeposit({
        acc_name: bank?.bank_acc_name ?? '',
        amount: realAmount,
        bank_type_id: bank?.bankTypeId ?? 0,
        payment_account_id: bank?.pay_acc_id ?? 0,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return null
        })

      if (depositResp) {
        const { success, data, message } = depositResp
        if (success && data) {
          if (receipt)
            if (depositUploadRef.current)
              await depositUploadRef.current.uploadReceipt(data.secure_id)

          Toast.show({ type: 'success', text1: message })
          actions.resetForm()
        }
      }
    } catch (error) {
      showAlert(error)
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

  useEffect(() => {
    const bank = values.bank
    if (bank)
      setLimit({
        minAmount: Number(bank.minDeposit) ?? 0,
        maxAmount: Number(bank.maxDeposit) ?? 0,
      })
  }, [values.bank])

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
      header={{
        title: PaymentMethod[0].name ?? t('menu.deposit'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
      <View sx={{ flex: 1 }}>
        <Select
          label={t('bank.bank')}
          placeholder={t('bank.selectBank')}
          value={values.bank?.bank_branch ?? ''}
          loading={isLoading || isFetching}
          options={sheetData}
          onSelected={handleSelected}
          isHorizontalActionSheet
          sx={{ mt: '$2', mb: 0 }}
          _actionSheet={{
            sheetId: ACTION_SHEET_ID.LOCAL_BANK,
            headerTitle: t('bank.bank'),
          }}
        />

        <InputBase
          removeBorder
          label={t('bank.accountName')}
          sx={{ mb: 0 }}
          value={values.bank?.bank_acc_name ?? ''}
          editable={false}
          action={
            <IconButton
              sx={{ p: INPUT_BASE_SPACE }}
              name="copy"
              size={18}
              color={'$lightCyan'}
              onPress={() => copyToClipboard(values.bank?.bank_acc_name)}
            />
          }
          selection={{ start: 0 }}
        />
        <InputBase
          removeBorder
          sx={{ mb: 0 }}
          label={t('bank.accountNo')}
          value={values.bank?.bank_acc_no ?? ''}
          editable={false}
          action={
            <IconButton
              sx={{ p: INPUT_BASE_SPACE }}
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

        <ReceiptUpload
          disabled={isSubmitting}
          sx={{
            m: '$2',
            mx: '$4',
          }}
          ref={depositUploadRef}
          value={values.receipt}
          onSelect={(f) => {
            setFieldValue('receipt', f)
          }}
        />

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

        <DepositTransactions isLocalBank />
      </View>
    </PageWithBackHeader>
  )
}

export default LocalBankScreen
