import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Button } from 'app/components/form/Button'
import IconButton from 'app/components/form/IconButton'
import { INPUT_BASE_SPACE } from 'app/components/form/Input/InputBase'
import MoneyInput from 'app/components/form/Input/MoneyInput'
import Select from 'app/components/form/Input/Select'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import useAlert from 'app/hooks/useAlert'
import useShield from 'app/hooks/useShield'
import useLocalization from 'app/provider/localization'
import {
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import validation from 'app/utils/validation'
import validationRule from 'app/utils/validationRule'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Shield_Action } from 'services/authApi.type'
import { PlayerBankResult } from 'services/bank.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { useSubmitWithdrawalMutation } from 'services/withdrawal'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

type WithdrawalFormProps = {
  isCrypto: boolean
  bankData: PlayerBankResult[]
  bankLoading: boolean
  onGoToBank: () => void
  minMax?: { min: number; max: number }
}

type WithdrawalValues = {
  amount: string
  realAmount: number
  bank: PlayerBankResult | undefined
}

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

const CRYPTO_CONFIRMATION_FIELDS = [
  {
    label: 'withdrawal.withdrawTo',
    value: 'bankName',
  },
  {
    label: 'bank.walletAddress',
    value: 'accountNumber',
  },
  {
    label: 'common.amount',
    value: 'amount',
  },
]

const WithdrawalForm = ({
  isCrypto,
  bankData,
  bankLoading,
  onGoToBank,
  minMax,
}: WithdrawalFormProps) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()
  const { showAlert } = useAlert()
  const { playerBalance } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data }) => ({
      playerBalance: Number(data?.data?.main.balance),
    }),
  })

  const { currency, username } = usePlayerProfileQuery()

  const [postSubmitWithdrawal] = useSubmitWithdrawalMutation()
  const { syncShield } = useShield()

  const sheetData = bankData?.map((item) => {
    return {
      label: item.BankAccountNumber,
      value: item.BankTypeId,
      icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.BankIcon}`,
    }
  })

  useEffect(() => {
    bankData && bankData?.length > 0
      ? setFieldValue('bank', bankData[0])
      : setFieldValue('bank', undefined)
  }, [bankData])

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.BankAccountNumber === value.label)
    setFieldValue('bank', item)
  }

  const onSubmit = async (
    { bank, realAmount }: WithdrawalValues,
    actions: FormikHelpers<WithdrawalValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postSubmitWithdrawal({
        amount: realAmount,
        bank_details_id: bank?.PlayerBankDetailsId ?? 0,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        if (username) {
          syncShield(Shield_Action.WITHDRAWAL)
        }
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()
      }
    } catch (error) {
      showAlert(error)
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
      amount: validationRule.amount({
        min: toDisplayAmount((minMax && minMax.min) ?? 1, currency),
        max: toDisplayAmount(
          playerBalance !== 0
            ? minMax
              ? Math.min(minMax.max, playerBalance)
              : playerBalance
            : 1,
          currency
        ),
      }),
    }),
    onSubmit,
  })

  const {
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
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
        bankName: values.bank?.BankName,
        accountName: values.bank?.BankAccountFullName,
        accountNumber: values.bank?.BankAccountNumber,
        amount:
          toCurrency(values.realAmount, currency, {
            forceDecimal: false,
            hideTruncatedThousand: false,
          }) ?? '',
      },
      bankLogo:
        values.bank?.BankIcon &&
        `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${values.bank?.BankIcon}`,
      fields: isCrypto ? CRYPTO_CONFIRMATION_FIELDS : CONFIRMATION_FIELDS,
      onConfirm: () => onSubmit(values, formik),
    })
  }

  const handleMaxAmount = () => {
    const value = toCurrency(Number(playerBalance), currency, {
      symbol: false,
      hideTruncatedThousand: false,
    })

    setValues({
      ...values,
      amount: value.slice(0, -1),
      realAmount: toRealAmount(value.replaceAll(',', '')),
    })
  }

  const renderEmpty = () => (
    <View
      sx={{
        width: '100%',
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        bg: 'white',
      }}
    >
      <Button
        rounded
        stretch
        variant="lg"
        fill={{
          type: 'gradient',
          color: 'secondary',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        onPress={onGoToBank}
      >
        <Button.Label>
          {isCrypto ? t('bank.addCryptoAccount') : t('bank.addBankAccount')}
        </Button.Label>
      </Button>
    </View>
  )

  return (
    <>
      <Select
        label={
          values.bank?.BankName ??
          (isCrypto ? t('bank.walletAddress') : t('bank.bank'))
        }
        value={values.bank?.BankAccountNumber ?? ''}
        loading={bankLoading}
        options={sheetData}
        onSelected={handleSelected}
        isHorizontalActionSheet={!isCrypto}
        sx={{ mb: '$2' }}
        _actionSheet={{
          sheetId: isCrypto
            ? ACTION_SHEET_ID.WITHDRAWAL_CRYPTO
            : ACTION_SHEET_ID.WITHDRAWAL,
          headerTitle: isCrypto
            ? t('deposit.depositMethod.crypto')
            : t('bank.bank'),
          actions:
            bankData?.length < 3
              ? [
                  {
                    icon: 'add',
                    onPress: onGoToBank,
                  },
                ]
              : [],
          emptyResultComponent: renderEmpty,
        }}
      />

      <MoneyInput
        label={t('common.amount')}
        placeholder={t('common.enterAmount', {
          field: t('menu.withdraw').toLowerCase(),
        })}
        keyboardType="number-pad"
        onChangeText={onAmountChanged}
        onBlur={handleBlur('amount')}
        value={values.amount}
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
        action={
          <IconButton
            sx={{ p: INPUT_BASE_SPACE }}
            name="ac"
            size={18}
            color={'$lightCyan'}
            onPress={handleMaxAmount}
          />
        }
      />

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
        onPress={withdrawalConfirmation}
      >
        <Button.Label>{t('common.next')}</Button.Label>
      </Button>
    </>
  )
}

export default WithdrawalForm
