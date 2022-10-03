import MenuNotice from 'app/components/common/MenuNotice'
import { Button } from 'app/components/form/Button'
import IconButton from 'app/components/form/IconButton'
import { INPUT_BASE_SPACE } from 'app/components/form/Input/InputBase'
import MoneyInput from 'app/components/form/Input/MoneyInput'
import Select from 'app/components/form/Input/Select'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { getBankLogo } from 'app/config/bank'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { WITHDRAWAL_NOTES } from 'app/constant/notes'
import useAlert from 'app/hooks/useAlert'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import {
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import validationRule from 'app/utils/validationRule'
import { styled, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useDispatch } from 'react-redux'
import { usePlayerBankQuery } from 'services/bank'
import { PlayerBankResult } from 'services/bank.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { useSubmitWithdrawalMutation } from 'services/withdrawal'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import AvailableBalance from './AvailableBalance'
import WithdrawalTransactions from './WithdrawalTransactions'

const actionSheetId = ACTION_SHEET_ID.WITHDRAWAL

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

const WithdrawalPage = () => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const { data: bankData, isLoading, isFetching } = usePlayerBankQuery()
  const [postSubmitWithdrawal] = useSubmitWithdrawalMutation()

  const { makeContextualHref } = useContextualRouting()
  const toBankAccount = makeContextualHref('bank-account')

  const { data: balanceData } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const playerBalance = balanceData?.data?.main.balance

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  const sheetData = bankData?.data?.map((item) => {
    return {
      label: item.BankAccountFullName,
      value: item.BankTypeId,
      icon: getBankLogo(item.BankCode),
    }
  })

  const handleSelected = (value) => {
    const item = bankData?.data?.find((el) => el.BankTypeId === value.value)
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
        bank_acc_name: bank?.BankAccountFullName ?? '',
        bank_acc_num: bank?.BankAccountNumber ?? '',
        bank_details_id: bank?.PlayerBankDetailsId ?? 0,
        bank_type_id: bank?.BankTypeId ?? 0,
        crypto_address: '112233',
        crypto_protocol: '112233',
        exchange_rate: 1,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
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
        min: toDisplayAmount(1, currency),
        max: toDisplayAmount(
          playerBalance !== '0' ? playerBalance : 1,
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
      bankLogo: getBankLogo(values.bank?.BankCode),
      fields: CONFIRMATION_FIELDS,
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

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.withdraw'),
        actions: (
          <MenuNotice
            onPress={() =>
              openModal('NoticeModal', { notice: WITHDRAWAL_NOTES })
            }
          />
        ),
      }}
    >
      <StyledView>
        <AvailableBalance />

        <Select
          label={values.bank?.BankName ?? t('bank.bank')}
          value={values.bank?.BankAccountNumber ?? ''}
          loading={isLoading || isFetching}
          options={sheetData}
          onSelected={handleSelected}
          isHorizontalActionSheet
          sx={{ mb: '$2' }}
          _actionSheet={{
            sheetId: ACTION_SHEET_ID.WITHDRAWAL,
            headerTitle: t('bank.bank'),
            actions: [
              {
                icon: 'add',
                onPress: () => {
                  SheetManager.hide(ACTION_SHEET_ID.WITHDRAWAL)
                  push(toBankAccount, '/profile/bank-account')
                },
              },
            ],
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

        {/* <ImportantNotice keys={NOTES} module="withdrawal" /> */}

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

        <WithdrawalTransactions />
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
}))

export default WithdrawalPage
