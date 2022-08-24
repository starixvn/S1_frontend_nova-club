import MenuNotice from 'app/components/common/MenuNotice'
import { FilePickerForwardRef } from 'app/components/FilePicker'
import { Button } from 'app/components/form/Button'
import IconButton from 'app/components/form/IconButton'
import InputBase from 'app/components/form/Input/InputBase'
import MoneyInput from 'app/components/form/Input/MoneyInput'
import Select from 'app/components/form/Input/Select'
import { PageWithBackHeader } from 'app/components/layout/Page'
import PaymentMethod from 'app/config/deposit'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { DEPOSIT_NOTES } from 'app/constant/notes'
import useLocalBankDeposit from 'app/hooks/deposit/useLocalBankDeposit'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import {
  copyToClipboard,
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import { Currency, DepositPaymentMethodCategoryId } from 'app/utils/constant'
import validation from 'app/utils/validation'
import validationRule from 'app/utils/validationRule'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useDepositPaymentListQuery } from 'services/deposit'
import { ManualBankItem } from 'services/deposit.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import DepositUpload from '../DepositUpload'
import DepositTransactions from './DepositTransactions'

export type LocalBankValues = {
  bank: ManualBankItem | null
  amount: string
  realAmount: number
}

const LocalBankScreen = () => {
  const { makeContextualHref } = useContextualRouting()

  const { t } = useLocalization()
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

  const sheetData = depositPayment?.list.map((item) => {
    return {
      label: item.bank_acc_name,
      value: item.bankTypeId,
      // icon: getBankLogo(item.BankCode),
    }
  })

  const handleSelected = (value) => {
    const item = depositPayment?.list?.find((el) => el.bankTypeId === value)
    setFieldValue('bank', item)
  }

  useEffect(() => {
    if (data?.success) {
      setFieldValue('bank', depositPayment?.list[0])
    }
  }, [data])

  const onSubmit = async (
    values: LocalBankValues,
    actions: FormikHelpers<LocalBankValues>
  ) => {
    await postDepositSubmit(values, actions)
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
          value={values.bank?.bank_acc_name ?? ''}
          loading={isLoading || isFetching}
          options={sheetData}
          onSelected={handleSelected}
          isHorizontalActionSheet
          sx={{ my: '$2' }}
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
          label={t('bank.accountNo')}
          value={values.bank?.bank_acc_no ?? ''}
          editable={false}
          action={
            <IconButton
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

        <DepositTransactions isLocalBank />
      </View>
    </PageWithBackHeader>
  )
}

export default LocalBankScreen
