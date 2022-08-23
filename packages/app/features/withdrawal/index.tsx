import { Button } from 'app/components/form/Button'
import MoneyInput from 'app/components/form/Input/MoneyInput'
import Select from 'app/components/form/Input/Select'
import ImportantNotice from 'app/components/ImportantNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import { getBankLogo } from 'app/config/bank'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert.slice'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { usePlayerBankQuery } from 'services/bank'
import { PlayerBankResult } from 'services/bank.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useSubmitWithdrawalMutation } from 'services/withdrawal'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import WithdrawalTransactions from './WithdrawalTransactions'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import AvailableBalance from './AvailableBalance'
import { usePlayerBalanceQuery } from 'services/walletApi'
import IconButton from 'app/components/form/IconButton'
import { MARGIN_TEXT_CENTERING } from 'app/constant/sizes'

const actionSheetId = ACTION_SHEET_ID.WITHDRAWAL

type WithdrawalValues = {
  amount: string
  realAmount: number
  bank: PlayerBankResult | undefined
}

const NOTES = [
  'notes.withdrawal.n1',
  'notes.withdrawal.n2',
  'notes.withdrawal.n3',
  'notes.withdrawal.n4',
  'notes.withdrawal.n5',
]
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
  const currency = playerData?.data?.currency as Currency

  const sheetData = bankData?.data?.map((item) => {
    return {
      label: item.BankAccountFullName,
      value: item.BankTypeId,
      icon: getBankLogo(item.BankCode),
    }
  })

  const handleSelected = (value) => {
    const item = bankData?.data?.find((el) => el.BankTypeId === value)
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
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        Toast.show({ type: 'success', text1: message })
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
    <PageWithBackHeader header={{ title: t('menu.withdraw') }}>
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
                icon: 'card',
                onPress: () => push(toBankAccount, '/profile/bank-account'),
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
                })
              : undefined
          }
          action={
            <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                numberOfLines={1}
                sx={{
                  fontWeight: 'bold',
                  color: '#FFFBAE',
                  mr: '$2',
                  mb: MARGIN_TEXT_CENTERING,
                }}
              >
                {`= ${values.amount ? values.amount : 0}K`}
              </Text>
              <IconButton
                name="ac"
                size={18}
                color={'$lightCyan'}
                onPress={handleMaxAmount}
              />
            </View>
          }
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
