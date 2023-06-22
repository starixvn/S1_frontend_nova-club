import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import IconButton from 'app/components/IconButton'
import MoneyInput from 'app/components/MoneyInput'
import Button from 'app/components/common/Button'
import Select from 'app/components/select/Select'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
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
import EmptyAccount from './EmptyAccount'
import { WithdrawalValues } from '../hooks/useWithdrawalForm'
import WithdrawalAmount from './WithdrawalAmount'

type WithdrawalFormProps = {
  isCrypto: boolean
  bankData: PlayerBankResult[]
  bankLoading: boolean
  onGoToBank: () => void
  minMax?: { min: number; max: number }
}

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
      playerBalance: data?.data?.main.balance,
    }),
  })

  const { currency, username } = usePlayerProfileQuery()

  const [postSubmitWithdrawal] = useSubmitWithdrawalMutation()
  const { syncShield } = useShield()

  const sheetData = bankData?.map((item) => {
    return {
      label: item.BankAccountNumber,
      value: item.BankAccountNumber,
      icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.BankIcon}`,
    }
  })

  useEffect(() => {
    bankData && bankData?.length > 0
      ? setFieldValue('bank', bankData[0])
      : setFieldValue('bank', undefined)
  }, [bankData])

  const handleSelected = (value) => {
    const item = bankData?.find((el) => el.BankAccountNumber === value)
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
      amount: validation.amountMinMax({
        min: toDisplayAmount((minMax && minMax.min) ?? 1, currency),
        max: toDisplayAmount(
          Number(playerBalance) > 0
            ? minMax
              ? Math.min(minMax.max, Number(playerBalance))
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
    handleChange,
    values,
    errors,
    touched,
    isValid,
    dirty,
    setValues,
    setFieldValue,
  } = formik
  console.log('🚀 ~ file: WithdrawalForm.tsx:147 ~ values:', values)

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
      // fields: isCrypto ? CRYPTO_CONFIRMATION_FIELDS : CONFIRMATION_FIELDS,
      formik: formik,
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

  const renderEmpty = (closeActionSheet) => (
    <EmptyAccount
      label={isCrypto ? t('wallet.addCryptoWallet') : t('bank.addBankAccount')}
      onClose={onGoToBank}
      onCloseActionSheet={closeActionSheet}
    />
  )

  return (
    <>
      <SelectWithCardGrid
        label={isCrypto ? t('bank.walletAddress') : t('bank.bankAcc')}
        subtitle={values.bank?.BankName}
        placeholder={
          isCrypto
            ? t('placeholder.plsSelectCrypto')
            : t('placeholder.plsSelectBank')
        }
        options={sheetData}
        value={values.bank?.BankAccountNumber}
        sx={{ width: '100%', mb: '$3' }}
        onSelected={(e) => handleSelected(e)}
        renderEmpty={renderEmpty}
      />

      <WithdrawalAmount isCrypto={isCrypto} formik={formik} minMax={minMax} />

      <View sx={{ flex: 1 }} />
      <Button
        disabled={!isValid || !dirty}
        sx={{ mt: '$4' }}
        onPress={withdrawalConfirmation}
      >
        {t('common.next')}
      </Button>
    </>
  )
}

export default WithdrawalForm
